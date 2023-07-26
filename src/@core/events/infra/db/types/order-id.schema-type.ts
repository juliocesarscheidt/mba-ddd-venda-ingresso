import { Type } from '@mikro-orm/core';
import { OrderId } from '../../../../../@core/events/domain/entities/order.entity';

export class OrderIdSchemaType extends Type<OrderId, string> {
  convertToDatabaseValue(valueObject: OrderId | undefined | null): string {
    return valueObject instanceof OrderId
      ? valueObject.value
      : (valueObject as string);
  }

  // não funciona para relacionamentos
  convertToJSValue(value: string): OrderId {
    return new OrderId(value);
  }

  getColumnType() {
    return `varchar(36)`;
  }
}
