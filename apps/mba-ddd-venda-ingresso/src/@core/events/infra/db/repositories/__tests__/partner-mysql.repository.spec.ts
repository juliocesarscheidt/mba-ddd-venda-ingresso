import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import { PartnerSchema } from '../../schemas';
import { PartnerMysqlRepository } from '../partner-mysql.repository';
import { Partner } from '../../../../domain/entities/partner.entity';

test('partner repository', async () => {
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
  const partnerRepository = new PartnerMysqlRepository(em);

  const partner = Partner.create({
    name: 'Parceiro 1',
  });
  await partnerRepository.add(partner);
  await em.flush();
  em.clear();

  let partnerFound = await partnerRepository.findById(partner.id);
  expect(partnerFound.id.equals(partner.id)).toBeTruthy();
  expect(partnerFound.name).toBe('Parceiro 1');

  partner.changeName('Parceiro 2');
  await partnerRepository.add(partner);
  await em.flush();
  em.clear();

  partnerFound = await partnerRepository.findById(partner.id);
  expect(partnerFound.id.equals(partner.id)).toBeTruthy();
  expect(partnerFound.name).toBe('Parceiro 2');

  await partnerRepository.delete(partner);

  const partners = await partnerRepository.findAll();
  expect(partners.length).toBe(0);

  await orm.close();
});
