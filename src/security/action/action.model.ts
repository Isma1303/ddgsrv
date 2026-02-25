import Model from '../../system/model'

export default class ActionModel<T, TNew, TUpdate> extends Model<T, TNew, TUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Actions'
        this.tableId = 'action_id'
        this.tableFields = [
            {
                name: 'action_id',
                description: 'Identificador único de la tabla actions',
                required: false,
            },
            {
                name: 'action',
                description: 'action',
                dataType: 'string',
                required: true,
            },
            {
                name: 'table_id',
                description: 'Nombre de la tabla a la que afecta',
                dataType: 'number',
                required: true,
            },
            {
                name: 'write_permission',
                description: 'Esta acción tiene permiso de escritura o solo lectura',
                dataType: 'boolean',
                required: true,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }
}
