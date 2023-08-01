import { Type } from '@mikro-orm/core';
import { EventSectionId } from '../../../../../@core/events/domain/entities/event-section';

export class EventSectionIdSchemaType extends Type<EventSectionId, string> {
  convertToDatabaseValue(
    valueObject: EventSectionId | undefined | null,
  ): string {
    return valueObject instanceof EventSectionId
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(value: string): EventSectionId {
    return new EventSectionId(value);
  }

  getColumnType(): string {
    return 'varchar(36)';
  }
}
