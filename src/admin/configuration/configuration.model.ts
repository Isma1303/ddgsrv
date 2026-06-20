import { Model } from "../../system/model";
import { IConfiguration, IConfigurationNew, IConfigurationUpdate } from "./configuration.interface";

export class ConfigurationModel extends Model<IConfiguration, IConfigurationNew, IConfigurationUpdate> {
    constructor() {
        super()
        this.tableSchema = 'admin'
        this.tableName = 'configuration'
        this.tableAlias = 'c'
        this.tableKey = 'configuration_id'
        this.tableColumns = [
            {
                field: 'configuration_id',
                required: false,
                description: 'Configuration identifired',
                type: 'number'
            },
            {
                field: 'configuration_nm',
                required: true,
                description: 'Configuration name',
                type: 'string'
            },
            {
                field: 'configuration_value',
                required: true,
                description: 'Configuration value',
                type: 'string'
            },
            {
                field: 'configuration_cd',
                required: true,
                description: 'Configuration code',
                type: 'string'
            },
            {
                field: 'is_active',
                required: true,
                description: 'Configuration is active',
                type: 'boolean'
            }
        ]
    }
}