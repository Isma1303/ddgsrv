import Model from '../../system/model'
import { ISystemAction, ISystemActionNew, ISystemActionUpdate } from './system_action.interface'

export default class SystemActionModel extends Model<ISystemAction, ISystemActionNew, ISystemActionUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_codeliq'
        this.schemaName = 'admin'
        this.tableName = 'System_actions'
        this.tableId = 'system_action_id'
        this.tableFields = [
            {
                name: 'system_action_id',
                description: 'Identificador de la tabla System_actions',
                dataType: 'number',
                required: false,
            },
            {
                name: 'system_action_name',
                description: 'Nombre de la acción del sistema',
                dataType: 'string',
                required: true,
            },
            {
                name: 'component_id',
                description: 'Identificador del componente de la acción (React Component)',
                dataType: 'string',
                required: true,
            },
            {
                name: 'module_name',
                description: 'Nombre del módulo de la acción en el sistema',
                dataType: 'string',
                required: false,
            },
            {
                name: 'route_path',
                description: 'Ruta de la acción en el sistema',
                dataType: 'string',
                required: false,
            },
            {
                name: 'http_method',
                description: 'Método HTTP de la acción en el sistema (GET, POST, PUT, DELETE)',
                dataType: 'string',
                required: false,
            },
            {
                name: 'action_type',
                description: 'Tipo de acción en el sistema (CRUD, REPORT, OTHER, DIV, BUTTON, LINK)',
                dataType: 'string',
                required: false,
            },
            {
                name: 'priority',
                description: 'Prioridad de la acción en el sistema',
                dataType: 'number',
                required: false,
            },
            {
                name: 'description',
                description: 'Descripción de la acción en el sistema',
                dataType: 'string',
                required: false,
            },
            {
                name: 'is_active',
                description: 'Indica si la acción está activa en el sistema',
                dataType: 'boolean',
                required: false,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }
}
