import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import { CustomerSchema } from '../infra/db/schemas';
import { CustomerMysqlRepository } from '../infra/db/repositories/customer-mysql.repository';
import { CustomerService } from './customer.service';

test('deve registrar e listar os customers', async () => {
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

  const customerService = new CustomerService(customerRepository);

  customerService.register({
    name: 'Customer 1',
    cpf: '71152471023',
  });
  customerService.register({
    name: 'Customer 2',
    cpf: '76862220047',
  });

  const customers = await customerService.list();
  expect(customers).toHaveLength(2);
});
