import { Type } from '@mikro-orm/core';
import { CustomerId } from '../../../../../@core/events/domain/entities/customer.entity';

export class CustomerIdSchemaType extends Type<CustomerId, string> {
  convertToDatabaseValue(valueObject: CustomerId | undefined | null): string {
    return valueObject instanceof CustomerId
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(value: string): CustomerId {
    return new CustomerId(value);
  }

  getColumnType(): string {
    return 'varchar(36)';
  }
}
