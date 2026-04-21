import Controller from '../../system/controller'
import ConfigurationModel from './configuration.model'
import { IConfiguration, IConfigurationNew, IConfigurationUpdate } from './configuration.interface'

export default class ConfigurationController extends Controller<IConfiguration, IConfigurationNew, IConfigurationUpdate> {
    model: ConfigurationModel<IConfiguration, IConfigurationNew, IConfigurationUpdate>

    constructor() {
        super()
        this.model = new ConfigurationModel()
    }
}
