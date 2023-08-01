import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import { CustomerSchema } from '../../schemas';
import { CustomerMysqlRepository } from '../customer-mysql.repository';
import { Customer } from '../../../../domain/entities/customer.entity';

test('customer repository', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [CustomerSchema],
    type: 'mysql',
    dbName: 'events',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'admin',
    forceEntityConstructor: true, // force em to use constructor from entity
  });
  // recreate database tables
  await orm.schema.refreshDatabase();

  const em = orm.em.fork();
  const customerRepository = new CustomerMysqlRepository(em);

  const customer = Customer.create({ cpf: '71152471023', name: 'Cliente 1' });
  await customerRepository.add(customer);
  await em.flush();
  em.clear();

  let customerFound = await customerRepository.findById(customer.id);
  expect(customerFound.id.equals(customer.id)).toBeTruthy();
  expect(customerFound.name).toBe('Cliente 1');
  expect(customerFound.cpf.value).toBe('71152471023');

  customer.changeName('Cliente 2');
  await customerRepository.add(customer);
  await em.flush();
  em.clear();

  customerFound = await customerRepository.findById(customer.id);
  expect(customerFound.id.equals(customer.id)).toBeTruthy();
  expect(customerFound.name).toBe('Cliente 2');

  await customerRepository.delete(customer);

  const customers = await customerRepository.findAll();
  expect(customers.length).toBe(0);

  await orm.close();
});
