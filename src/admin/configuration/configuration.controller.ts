import { Controller } from "../../system/controller";
import { IConfiguration, IConfigurationNew, IConfigurationUpdate } from "./configuration.interface";
import { ConfigurationModel } from "./configuration.model";

export class ConfigurationController extends Controller<IConfiguration, IConfigurationNew, IConfigurationUpdate> {
    constructor() {
        super(new ConfigurationModel())
    }
}