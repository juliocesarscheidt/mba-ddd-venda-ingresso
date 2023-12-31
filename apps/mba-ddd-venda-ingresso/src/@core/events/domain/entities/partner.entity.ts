import { AggregateRoot } from '../../../../@core/common/domain/aggregate-root';
import Uuid from '../../../../@core/common/domain/value-objects/uuid.vo';
import { PartnerCreated } from '../domain-events/partner-created.event';
import { PartnerNameChanged } from '../domain-events/partner-name-changed.event';
import { Event } from './event.entity';

export class PartnerId extends Uuid {}

export type InitEventCommand = {
  name: string;
  description?: string | null;
  date: Date;
};

export type PartnerConstructorProps = {
  id?: PartnerId | string;
  name: string;
};

export class Partner extends AggregateRoot {
  id: PartnerId;
  name: string;

  constructor(props: PartnerConstructorProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new PartnerId(props.id)
        : props.id ?? new PartnerId();
    this.name = props.name;
  }

  static create(command: { name: string }) {
    const partner = new Partner({
      name: command.name,
    });
    partner.addEvent(new PartnerCreated(partner.id, partner.name));
    return partner;
  }

  initEvent(command: InitEventCommand) {
    return Event.create({
      ...command,
      partner_id: this.id,
    });
  }

  changeName(name: string) {
    this.name = name;
    this.addEvent(new PartnerNameChanged(this.id, this.name));
  }

  toJSON(): any {
    return {
      id: this.id.value,
      name: this.name,
    };
  }
}
