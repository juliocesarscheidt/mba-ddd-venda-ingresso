import { Name } from './name.vo';

test('deve criar um nome válido', () => {
  const name = new Name('John Doe');
  expect(name.value).toBe('John Doe');
});

test('não deve criar um nome inválido', () => {
  expect(() => {
    new Name('A');
  }).toThrow('Name must be between 3 and 255 characters');
});
