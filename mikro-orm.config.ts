import {
  CustomerSchema,
  EventSchema,
  EventSectionSchema,
  EventSpotSchema,
  OrderSchema,
  PartnerSchema,
  SpotReservationSchema,
} from './src/@core/events/infra/db/schemas';

export default {
  entities: [
    CustomerSchema,
    PartnerSchema,
    EventSchema,
    EventSectionSchema,
    EventSpotSchema,
    OrderSchema,
    SpotReservationSchema,
  ],
  type: 'mysql',
  dbName: 'events',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'admin',
  forceEntityConstructor: true, // force em to use constructor from entity
};
