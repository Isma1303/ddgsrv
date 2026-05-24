export interface IServiceEventsUsers {}

export interface IServiceEventsUsersNew {
  service_event_id: number;
  user_id: number;
}

export interface IServiceEventsUsersUpdate {
  service_event_id?: number;
  user_id?: number;
}
