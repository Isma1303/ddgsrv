import { Controller } from "../../system/controller";
import { IEvent, IEventNew, IEventUpdate } from "./events.interface";
import { EventsModel } from "./events.model";

export class EventsController extends Controller<IEvent, IEventNew, IEventUpdate> {
    constructor() {
        super(new EventsModel())
    }
}
