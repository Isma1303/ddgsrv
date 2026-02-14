export interface IConfiguration {
    configuration_id: number
    configuration_nm: string
    configuration_value: string
    configuration_cd: string
    is_active: boolean
}

export interface IConfigurationNew extends Omit<IConfiguration, 'configuration_id'> { }
export interface IConfigurationUpdate extends Partial<IConfiguration> { }
