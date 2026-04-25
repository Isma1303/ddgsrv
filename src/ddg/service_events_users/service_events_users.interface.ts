export interface IServiceEventsUsers {
    service_event_id: number
    user_id: number
}

export interface IServiceEventsUsersNew extends Omit<IServiceEventsUsers, ''> {}
export interface IServiceEventsUsersUpdate extends Partial<IServiceEventsUsers> {}
