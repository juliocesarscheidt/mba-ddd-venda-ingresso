import { ValueObject } from './value-object';

export class Name extends ValueObject<string> {
  constructor(name: string) {
    super(name);
    this.validate();
  }

  validate(): void {
    const isValid = this.value.length >= 3 && this.value.length <= 255;
    if (!isValid) {
      throw new InvalidNameError('Name must be between 3 and 255 characters');
    }
  }
}

export class InvalidNameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidNameError';
  }
}

export default Name;
