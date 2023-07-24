import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import {
  EventSchema,
  EventSectionSchema,
  EventSpotSchema,
  PartnerSchema,
} from '../../schemas';
import { EventMysqlRepository } from '../event-mysql.repository';
import { PartnerMysqlRepository } from '../partner-mysql.repository';
import { Partner } from '../../../../../../@core/events/domain/entities/partner.entity';

test('event repository', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [EventSchema, EventSectionSchema, EventSpotSchema, PartnerSchema],
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
  const eventRepository = new EventMysqlRepository(em);
  const partnerRepository = new PartnerMysqlRepository(em);

  const partner = Partner.create({
    name: 'Parceiro 1',
  });
  await partnerRepository.add(partner);
  // await em.flush();

  const event = partner.initEvent({
    name: 'Evento 1',
    date: new Date(),
    description: 'Evento 1',
  });

  event.addSection({
    name: 'Setor 1',
    description: 'Setor 1 descrição',
    price: 100,
    total_spots: 100,
  });

  await eventRepository.add(event);
  await em.flush();
  em.clear();

  await orm.close();
});
