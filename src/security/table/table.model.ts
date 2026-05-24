import Model from '../../system/model'

export default class TablaModel<T, TNew, TUpdate> extends Model<T, TNew, TUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_codeliq'
        this.schemaName = 'admin'
        this.tableName = 'Tables'
        this.tableId = 'table_id'
        this.tableFields = [
            {
                name: 'table_id',
                description: 'Identificador único de la tabla Tablas',
                required: false,
            },
            {
                name: 'table_name',
                description: 'Nombre de la tabla',
                required: true,
                maxLength: 75,
            },
            {
                name: 'field_id',
                description: 'Campo de la tabla que funciona como identificador único',
                required: true,
                maxLength: 75,
            },
            {
                name: 'schema_name',
                description: 'El Schema de la tabla',
                required: true,
                maxLength: 75,
            },
            {
                name: 'assignable_rls',
                description: 'Indica si a la tabla se le puede asignar protección RLS',
                required: true,
            },
            {
                name: 'alias_nm',
                description: 'Alias de la tabla',
                required: false,
                maxLength: 255,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }
}
