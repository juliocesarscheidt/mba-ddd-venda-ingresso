import crypto from 'crypto';
import { validate as uuidValidate } from 'uuid';
import { ValueObject } from './value-object';

export class Uuid extends ValueObject<string> {
  constructor(id?: string) {
    super(id || crypto.randomUUID());
    this.validate();
  }

  validate(): void {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError('Invalid UUID');
    }
  }
}

export class InvalidUuidError extends Error {
  constructor(invalidValue: any) {
    super(`value ${invalidValue} must be a valid UUID`);
    this.name = 'InvalidUuidError';
  }
}

export default Uuid;
