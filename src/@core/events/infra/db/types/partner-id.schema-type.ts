import { Type } from '@mikro-orm/core';
import { PartnerId } from '../../../../../@core/events/domain/entities/partner.entity';

export class PartnerIdSchemaType extends Type<PartnerId, string> {
  convertToDatabaseValue(valueObject: PartnerId | undefined | null): string {
    return valueObject instanceof PartnerId
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(value: string): PartnerId {
    return new PartnerId(value);
  }

  getColumnType(): string {
    return 'varchar(36)';
  }
}
