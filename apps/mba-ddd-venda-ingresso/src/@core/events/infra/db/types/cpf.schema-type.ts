import { Type } from '@mikro-orm/core';
import Cpf from '../../../../../@core/common/domain/value-objects/cpf.vo';

export class CpfSchemaType extends Type<Cpf, string> {
  convertToDatabaseValue(valueObject: Cpf | undefined | null): string {
    return valueObject instanceof Cpf
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(value: string): Cpf {
    return new Cpf(value);
  }

  getColumnType(): string {
    return 'varchar(11)';
  }
}
