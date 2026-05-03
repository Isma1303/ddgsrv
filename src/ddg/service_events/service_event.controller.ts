import Controller from '../../system/controller'
import { ServiceEventModel } from './service_event.model'
import { ISeviceEvent, IServiceEventNew, IServiceEventUpdate } from './service_event.interface'
import IResponse from '../../system/interfaces/response.interface'
import { ReminderTemplate } from '../../system/emails/templates/reminder.template'
import config from '../../config'
import { Request } from 'express'
import Condition from '../../system/interfaces/condition.interface'

export class ServiceEventController extends Controller<ISeviceEvent, IServiceEventNew, IServiceEventUpdate> {
    constructor() {
        super()
        this.model = new ServiceEventModel()
    }

    public async sendReminder(req: Request): Promise<IResponse> {
        try {
            const model = new ServiceEventModel()
            const { service_event_id } = req.body

            const data: any = await model.serviceData(service_event_id)
            if (data.length === 0) {
                return {
                    message: 'No se encontraron registros',
                    statusCode: 404,
                }
            }
            for (const item of data) {
                await this.sendEmail({
                    to: item.email,
                    from: config.EMAIL.EMAIL_FROM,
                    subject: 'Recordatorio de servicio',
                    html: ReminderTemplate(
                        config.LOGO_URL,
                        item.user_name,
                        item.service_nm,
                        item.service_date,
                        item.start_time,
                        item.end_time,
                        item.notes,
                    ),
                })
            }

            return {
                message: 'Recordatorio enviado correctamente',
                statusCode: 200,
            }
        } catch (error: any) {
            return {
                message: 'Error al enviar recordatorio',
                errorMessage: error.message,
                statusCode: 500,
            }
        }
    }
}
