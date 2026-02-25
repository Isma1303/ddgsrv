import Model from '../../system/model'

export default class ConfigurationModel<T, TNew, TUpdate> extends Model<T, TNew, TUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Configurations'
        this.tableId = 'configuration_id'
        this.tableFields = [
            {
                name: 'configuration_id',
                description: 'Unique identifier for the configurations table',
                required: false,
            },
            {
                name: 'configuration',
                description: 'Name of the configuration',
                required: true,
                maxLength: 75,
            },
            {
                name: 'value',
                description: 'Configuration value stored as a string; can range from text to numbers',
                required: true,
                maxLength: 500,
            },
            {
                name: 'configuration_cd',
                description: 'Configuration code for search without ID; used to maintain reference if ID is deleted',
                required: true,
                maxLength: 25,
            },
        ]
        this.fieldNames = this.getFieldsString()
    }
}
