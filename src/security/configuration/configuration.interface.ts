export interface IConfiguration {
    configuration_id: number
    configuration: string
    value: string
    configuration_cd: string
}

export interface IConfigurationNew extends Omit<IConfiguration, 'configuration_id'> {}
export interface IConfigurationUpdate extends Partial<IConfiguration> {}
