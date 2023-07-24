import { Type } from '@mikro-orm/core';
import { EventSpotId } from '../../../../../@core/events/domain/entities/event-spot';

export class EventSpotIdSchemaType extends Type<EventSpotId, string> {
  convertToDatabaseValue(valueObject: EventSpotId | undefined | null): string {
    return valueObject instanceof EventSpotId
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(value: string): EventSpotId {
    return new EventSpotId(value);
  }

  getColumnType(): string {
    return 'varchar(36)';
  }
}
