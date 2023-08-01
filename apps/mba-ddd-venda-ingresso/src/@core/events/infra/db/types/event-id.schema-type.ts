import { Type } from '@mikro-orm/core';
import { EventId } from '../../../../../@core/events/domain/entities/event.entity';

export class EventIdSchemaType extends Type<EventId, string> {
  convertToDatabaseValue(valueObject: EventId | undefined | null): string {
    return valueObject instanceof EventId
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(value: string): EventId {
    return new EventId(value);
  }

  getColumnType(): string {
    return 'varchar(36)';
  }
}
