import { Cascade, EntitySchema } from '@mikro-orm/core';
import { Partner } from '../../domain/entities/partner.entity';
import { PartnerIdSchemaType } from './types/partner-id.schema-type';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerIdSchemaType } from './types/customer-id.schema-type';
import { CpfSchemaType } from './types/cpf.schema-type';
import { Event } from '../../domain/entities/event.entity';
import { EventIdSchemaType } from './types/event-id.schema-type';
import { EventSection } from '../../domain/entities/event-section';
import { EventSectionIdSchemaType } from './types/event-section-id.schema-type';
import { EventSpot } from '../../domain/entities/event-spot';
import { EventSpotIdSchemaType } from './types/event-spot-id.schema-type';

export const PartnerSchema = new EntitySchema<Partner>({
  class: Partner,
  properties: {
    id: { primary: true, customType: new PartnerIdSchemaType() },
    name: { type: 'string', length: 255 },
  },
});

export const CustomerSchema = new EntitySchema<Customer>({
  class: Customer,
  uniques: [{ properties: ['cpf'] }],
  properties: {
    id: {
      customType: new CustomerIdSchemaType(),
      primary: true,
    },
    cpf: { customType: new CpfSchemaType() },
    name: { type: 'string', length: 255 },
  },
});

export const EventSchema = new EntitySchema<Event>({
  class: Event,
  properties: {
    id: {
      customType: new EventIdSchemaType(),
      primary: true,
    },
    name: { type: 'string', length: 255 },
    description: { type: 'text', nullable: true },
    date: { type: 'date' },
    is_published: { type: 'boolean', default: false },
    total_spots: { type: 'number', default: 0 },
    total_spots_reserved: { type: 'number', default: 0 },
    sections: {
      reference: '1:m', // one-to-many
      entity: () => EventSection,
      mappedBy: (section: any) => section.event_id,
      eager: true, // eager vs lazy
      cascade: [Cascade.ALL],
    },
    partner_id: {
      reference: 'm:1', // many-to-one
      entity: () => Partner,
      mapToPk: true,
      customType: new PartnerIdSchemaType(),
      inherited: true,
    },
  },
});

export const EventSectionSchema = new EntitySchema<EventSection>({
  class: EventSection,
  properties: {
    id: {
      customType: new EventSectionIdSchemaType(),
      primary: true,
    },
    name: { type: 'string', length: 255 },
    description: { type: 'text', nullable: true },
    is_published: { type: 'boolean', default: false },
    total_spots: { type: 'number', default: 0 },
    total_spots_reserved: { type: 'number', default: 0 },
    price: { type: 'number', default: 0 },
    spots: {
      reference: '1:m', // one-to-many
      entity: () => EventSpot,
      mappedBy: (section: any) => section.event_section_id,
      eager: true, // eager vs lazy
      cascade: [Cascade.ALL],
    },
    event_id: {
      reference: 'm:1', // many-to-one
      entity: () => Event,
      hidden: true,
      mapToPk: true,
      customType: new EventIdSchemaType(),
    },
  },
});

export const EventSpotSchema = new EntitySchema<EventSpot>({
  class: EventSpot,
  properties: {
    id: {
      customType: new EventSpotIdSchemaType(),
      primary: true,
    },
    location: { type: 'string', length: 255, nullable: true },
    is_reserved: { type: 'boolean', default: false },
    is_published: { type: 'boolean', default: false },
    event_section_id: {
      reference: 'm:1', // many-to-one
      entity: () => EventSection,
      hidden: true,
      mapToPk: true,
      customType: new EventSectionIdSchemaType(),
    },
  },
});
