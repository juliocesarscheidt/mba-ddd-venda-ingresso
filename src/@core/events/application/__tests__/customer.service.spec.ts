import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import { CustomerSchema } from '../../infra/db/schemas';
import { CustomerMysqlRepository } from '../../infra/db/repositories/customer-mysql.repository';
import { CustomerService } from '../customer.service';
import { UnitOfWorkMikroOrm } from '../../../common/infra/unit-of-work-mikro-orm';

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
  const uow = new UnitOfWorkMikroOrm(em);
  const customerRepository = new CustomerMysqlRepository(em);
  const customerService = new CustomerService(customerRepository, uow);

  const customer0 = await customerService.register({
    name: 'Customer 1',
    cpf: '71152471023',
  });
  await customerService.register({
    name: 'Customer 2',
    cpf: '76862220047',
  });

  const customers = await customerService.list();
  expect(customers).toHaveLength(2);
  expect(customer0.name).toBe('Customer 1');
  expect(customer0.cpf.value).toBe('71152471023');

  em.clear();

  const customerFound = await customerRepository.findById(customer0.id);
  expect(customerFound?.name).toBe('Customer 1');
  expect(customerFound.cpf.value).toBe('71152471023');

  await orm.close();
});
