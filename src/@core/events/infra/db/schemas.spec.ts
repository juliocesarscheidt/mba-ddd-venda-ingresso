import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import { PartnerSchema } from './schemas';
import { Partner } from '../../domain/entities/partner.entity';

test('deve criar um partner', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [PartnerSchema],
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

  const partner = Partner.create({
    name: 'Parceiro 1',
  });
  console.log(partner);

  // save in memory
  em.persist(partner);
  // persist on database
  await em.flush();
  // clear in memory
  em.clear();

  const partnerFound = await em.findOne(Partner, { id: partner.id });
  console.log(partnerFound);

  await orm.close();
});
