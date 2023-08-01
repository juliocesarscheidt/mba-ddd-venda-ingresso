export interface IIntegrationEvent<T = any> {
  event_name: string;
  payload: T;
  occurred_on: Date;
  event_version: number;
}
