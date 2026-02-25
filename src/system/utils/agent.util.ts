import { OpenAI } from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index'
import { AgentOptions, AgentContext, AgentTool } from '../interfaces/agent.interface'
import configuration from '../../config'
import Model from '../model'

const client = new OpenAI({
    baseURL: configuration.OPENAI?.BASE_URL,
    apiKey: configuration.OPENAI?.API_KEY,
})

const buildContextContent = (contexts?: AgentContext[]): string => {
    if (!contexts || contexts.length === 0) {
        return ''
    }

    const contextParts = contexts.map((ctx) => {
        const content = typeof ctx.content === 'object' ? JSON.stringify(ctx.content, null, 2) : ctx.content

        return `### ${ctx.label} (${ctx.type})\n${content}`
    })

    return `\n\n## Contexto Adicional\n\n${contextParts.join('\n\n')}`
}

const buildSystemInstructions = (baseInstructions?: string, tools?: AgentTool[]): string => {
    let instructions = baseInstructions || 'Eres un asistente AI preciso y eficiente. Responde de manera clara y estructurada.'

    if (tools && tools.length > 0) {
        const toolDescriptions = tools
            .map((tool) => {
                return `- **${tool.name}**: ${tool.description || 'Herramienta disponible para usar'}`
            })
            .join('\n')

        instructions += `\n\n## Herramientas Disponibles\n\nTienes acceso a las siguientes herramientas para ayudar al usuario:\n${toolDescriptions}\n\nCuando necesites realizar operaciones CRUD, responde con un JSON que incluya:\n- operation: tipo de operación (create, read, update, delete)\n- tool: nombre de la herramienta a usar\n- data: datos necesarios para la operación\n- params: parámetros de la URL si son necesarios`
    }

    return instructions
}

const calculateNotifyAt = (reminder: any, dueDate?: Date | string | null): string | null => {
    if (!reminder) return null

    if (reminder.notify_at) {
        return typeof reminder.notify_at === 'string' ? reminder.notify_at : reminder.notify_at.toISOString()
    }

    if (reminder.timeBefore !== undefined && reminder.unit) {
        const baseDate = dueDate ? new Date(dueDate) : new Date()
        const timeBefore = Number(reminder.timeBefore) || 0

        let milliseconds = 0
        switch (reminder.unit.toUpperCase()) {
            case 'MINUTES':
                milliseconds = timeBefore * 60 * 1000
                break
            case 'HOURS':
                milliseconds = timeBefore * 60 * 60 * 1000
                break
            case 'DAYS':
                milliseconds = timeBefore * 24 * 60 * 60 * 1000
                break
            default:
                milliseconds = timeBefore * 60 * 1000
        }

        const notifyAt = new Date(baseDate.getTime() - milliseconds)
        return notifyAt.toISOString()
    }

    return null
}

const toolOperationMap: { [key: string]: { [key: string]: any } } = {
    'deal-activities': {
        create: {
            method: 'addToDeal',
            isMultiple: true,
            dataTransform: (data: any, referenceId?: number) => {
                const activities = Array.isArray(data) ? data : [data]
                return activities.map((activity: any) => {
                    const { reminders, reminder: activityReminder, startAtUtc, endAtUtc, user_creation_id, ...rest } = activity

                    const rawReminder = Array.isArray(reminders) && reminders.length > 0 ? reminders[0] : activityReminder || reminders

                    let transformedReminder = null
                    if (rawReminder) {
                        const notifyAt = calculateNotifyAt(rawReminder, activity.due_date || startAtUtc)
                        if (notifyAt) {
                            transformedReminder = {
                                notify_at: notifyAt,
                                notification_channel: rawReminder.notification_channel || 'IN_APP',
                            }
                        }
                    }

                    return {
                        dealId: referenceId,
                        record: {
                            ...rest,
                            due_date: activity.due_date || startAtUtc || null,
                            assigned_user_id: activity.assigned_user_id || user_creation_id,
                            ...(transformedReminder ? { reminder: transformedReminder } : {}),
                        },
                    }
                })
            },
        },
        read: {
            method: 'listByDeal',
            dataTransform: (data: any, referenceId?: number, params?: any) => [referenceId, params?.status ? { status: params.status } : undefined],
        },
        list: {
            method: 'listByDeal',
            dataTransform: (data: any, referenceId?: number, params?: any) => [referenceId, params?.status ? { status: params.status } : undefined],
        },
        update: {
            method: 'updateInDeal',
            dataTransform: (data: any, referenceId?: number) => {
                const { deal_activity_id, ...updateData } = data
                return [referenceId, deal_activity_id, updateData]
            },
        },
        delete: {
            method: 'removeFromDeal',
            dataTransform: (data: any, referenceId?: number, params?: any) => [referenceId, params?.dealActivityId || data?.dealActivityId],
        },
    },
    'deal-activity-reminders': {
        create: {
            method: 'add',
            dataTransform: (data: any, dealActivityId?: number) => ({
                deal_activity_id: dealActivityId,
                ...data,
            }),
        },
    },
}

const executeToolOperation = async (operation: any, crudModel: any, userId: number, referenceId?: number): Promise<any> => {
    try {
        if (!crudModel) {
            crudModel = new Model()
        }

        const toolConfig = toolOperationMap[operation.tool]
        if (!toolConfig) {
            throw new Error(`Tool no configurado: ${operation.tool}`)
        }

        const operationConfig = toolConfig[operation.operation]
        if (!operationConfig) {
            throw new Error(`Operación no configurada para el tool ${operation.tool}: ${operation.operation}`)
        }

        const methodName = operationConfig.method
        const modelInstance = crudModel.find((model: any) => typeof model[methodName] === 'function')

        if (!modelInstance) {
            throw new Error(`El método ${methodName} no existe en ningún modelo para ${operation.tool}`)
        }

        const methodToCall = modelInstance[methodName].bind(modelInstance)

        if (operationConfig.isMultiple && operationConfig.dataTransform) {
            const transformedItems = operationConfig.dataTransform(operation.data, referenceId, operation.params)

            if (Array.isArray(transformedItems) && transformedItems.length > 0) {
                const results = []
                for (const item of transformedItems) {
                    const methodArgs = [item.dealId, item.record, userId]
                    const result = await methodToCall(...methodArgs)
                    results.push(result)
                }
                return results
            }
        }

        let methodArgs
        if (operationConfig.dataTransform) {
            const transformedData = operationConfig.dataTransform(operation.data, referenceId, operation.params)
            methodArgs = Array.isArray(transformedData) ? transformedData : [transformedData]
        } else {
            methodArgs = [operation.data]
        }

        if (['create', 'update'].includes(operation.operation)) {
            methodArgs.push(userId)
        }
        return await methodToCall(...methodArgs)
    } catch (error) {
        console.error(`Error ejecutando operación ${operation.operation}:`, error)
        throw error
    }
}

const convertOpenAPIToTools = (tools?: AgentTool[]): any[] | undefined => {
    if (!tools || tools.length === 0) {
        return undefined
    }
    return undefined
}

export const aiAgent = async (options: AgentOptions & { executeOperations?: boolean; crudModel?: any[]; userId?: number; dealId?: number }) => {
    try {
        const {
            model = 'solcomp-testing-agent',
            prompt,
            instructions,
            contexts,
            tools,
            responseFormat = 'json_object',
            result = [],
            executeOperations = false,
            crudModel,
            userId,
            dealId,
        } = options

        if (!prompt || prompt.trim().length === 0) {
            throw new Error('El prompt es requerido y no puede estar vacío')
        }

        const systemInstructions = buildSystemInstructions(instructions, tools)
        const contextContent = buildContextContent(contexts)

        let toolsContext = ''
        if (tools && tools.length > 0) {
            const toolSpecs = tools
                .map((tool) => {
                    return `### ${tool.name}\n\`\`\`json\n${JSON.stringify(tool.spec, null, 2)}\n\`\`\``
                })
                .join('\n\n')

            toolsContext = `\n\n## Especificaciones de APIs Disponibles\n\n${toolSpecs}\n\nPuedes usar estas APIs para realizar operaciones directamente.`
        }

        const messages: ChatCompletionMessageParam[] = [
            {
                role: 'system',
                content: systemInstructions,
            },
            {
                role: 'user',
                content: `${prompt}${contextContent}${toolsContext}`,
            },
        ]

        const completionParams: any = {
            model,
            messages,
        }

        if (responseFormat === 'json_object') {
            completionParams.response_format = { type: 'json_object' }

            if (!systemInstructions.toLowerCase().includes('json')) {
                messages[0].content += '\n\nIMPORTANTE: Responde siempre con JSON válido.'
            }
        }

        const openAITools = convertOpenAPIToTools(tools)
        if (openAITools) {
            completionParams.tools = openAITools
        }

        const completion = await client.chat.completions.create(completionParams)
        const extraction = completion.choices[0].message

        let parsed: any = null
        if (extraction && extraction.content) {
            if (responseFormat === 'json_object') {
                try {
                    parsed = typeof extraction.content === 'string' ? JSON.parse(extraction.content) : extraction.content
                } catch (parseError) {
                    console.error('Error al parsear respuesta JSON:', parseError)
                    throw new Error(`La respuesta del agente no es JSON válido: ${extraction.content}`)
                }
            } else {
                parsed = extraction.content
            }
        }

        if (executeOperations && parsed && crudModel && userId !== undefined) {
            try {
                let executionResult

                if (parsed.operation && parsed.tool) {
                    executionResult = await executeToolOperation(parsed, crudModel, userId, dealId)
                    parsed.executionResult = executionResult
                    parsed.executed = true
                } else if (parsed.operations && Array.isArray(parsed.operations)) {
                    const results = []
                    for (const op of parsed.operations) {
                        const opResult = await executeToolOperation(op, crudModel, userId, dealId)
                        results.push({ operation: op, result: opResult })
                    }
                    parsed.executionResults = results
                    parsed.executed = true
                }
            } catch (executionError: any) {
                console.error('Error ejecutando operaciones:', executionError)
                parsed.executionError = executionError.message
                parsed.executed = false
            }
        }

        if (parsed) {
            result.push(parsed)
        }

        return result
    } catch (error) {
        console.error('Error en AIagent:', error)
        throw error
    }
}
