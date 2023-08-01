import { Cpf } from './cpf.vo';

test('deve criar um cpf válido', () => {
  const name = new Cpf('71152471023');
  expect(name.value).toBe('71152471023');
});

test('não deve criar um cpf inválido', () => {
  expect(() => {
    new Cpf('12345678901');
  }).toThrow('CPF is invalid');
});
