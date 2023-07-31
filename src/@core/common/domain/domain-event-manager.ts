import { AggregateRoot } from './aggregate-root';
import EventEmitter2 from 'eventemitter2';

export class DomainEventManager {
  eventEmitter: EventEmitter2;

  constructor() {
    this.eventEmitter = new EventEmitter2({ wildcard: true });
  }

  register(event: string, handler: any) {
    this.eventEmitter.on(event, handler);
  }

  async publish(aggregateRoot: AggregateRoot) {
    for (const event of aggregateRoot.events) {
      const eventClassName = event.constructor.name;
      await this.eventEmitter.emitAsync(eventClassName, event);
    }
    aggregateRoot.clearEvents();
  }
}
