import Cpf from '../../../../../@core/common/domain/value-objects/cpf.vo';
import { Customer, CustomerId } from '../customer.entity';

test('deve criar um cliente válido', () => {
  const customer = Customer.create({
    name: 'John Doe',
    cpf: '71152471023',
  });
  expect(customer.id).toBeDefined();
  expect(customer.id).toBeInstanceOf(CustomerId);
  expect(customer.name).toBe('John Doe');
  expect(customer.cpf.value).toBe('71152471023');
});

test('deve criar um cliente válido com um uuid existente', () => {
  const customer = new Customer({
    id: 'a0f02c1e-0c1a-4b4a-8f5a-2b8d7f9b2c2e',
    name: 'John Doe',
    cpf: new Cpf('71152471023'),
  });
  expect(customer.id).toBeDefined();
  expect(customer.id).toBeInstanceOf(CustomerId);
  expect(customer.name).toBe('John Doe');
  expect(customer.cpf.value).toBe('71152471023');
  expect(customer.id.value).toBe('a0f02c1e-0c1a-4b4a-8f5a-2b8d7f9b2c2e');
});

test('os clientes com mesmo uuid devem ser iguais', () => {
  const customer1 = Customer.create({
    name: 'John Doe',
    cpf: '71152471023',
  });
  const customer2 = new Customer({
    id: customer1.id.value,
    name: 'John Doe',
    cpf: new Cpf('71152471023'),
  });
  expect(customer1.equals(customer2)).toBeTruthy();
});

test('não deve criar um cliente inválido', () => {
  expect(() => {
    Customer.create({
      name: 'John Doe',
      cpf: '12345678901',
    });
  }).toThrow('CPF is invalid');
});
