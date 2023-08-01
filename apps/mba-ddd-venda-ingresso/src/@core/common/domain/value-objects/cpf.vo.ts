import { ValueObject } from './value-object';

export class Cpf extends ValueObject<string> {
  constructor(value: string) {
    super(value.replace(/\D/g, ''));
    this.validate();
  }

  validate(): void {
    if (this.value.length != 11) {
      throw new InvalidCpfError(
        'CPF must have 11 digits, but it has ' + this.value.length + ' digits',
      );
    }

    const allDigitsAreEqual = /^\d{1}(\d)\1{10}$/.test(this.value);
    if (allDigitsAreEqual) {
      throw new InvalidCpfError('CPF must have at least 2 different digits');
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(this.value.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit > 9) {
      firstDigit = 0;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(this.value.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit > 9) {
      secondDigit = 0;
    }

    if (
      firstDigit !== parseInt(this.value.charAt(9)) ||
      secondDigit !== parseInt(this.value.charAt(10))
    ) {
      throw new InvalidCpfError('CPF is invalid');
    }
  }
}

export class InvalidCpfError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCpfError';
  }
}

export default Cpf;
