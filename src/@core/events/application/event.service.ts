import { IUnitOfWork } from '../../../@core/common/application/unit-of-work.interface';
import { IEventRepository } from '../domain/repositories/event-repository.interface';
import { IPartnerRepository } from '../domain/repositories/partner-repository.interface';
import { EventSectionId } from '../domain/entities/event-section';
import { EventSpotId } from '../domain/entities/event-spot';

export class EventService {
  constructor(
    private eventRepository: IEventRepository,
    private partnerRepository: IPartnerRepository,
    private uow: IUnitOfWork,
  ) {}

  list() {
    return this.eventRepository.findAll();
  }

  async findSections(event_id: string) {
    const event = await this.eventRepository.findById(event_id);
    return event?.sections;
  }

  async create(input: {
    name: string;
    description?: string | null;
    date: Date;
    partner_id: string;
  }) {
    const partner = await this.partnerRepository.findById(input.partner_id);
    if (!partner) {
      throw new Error('Partner not found');
    }
    const event = partner.initEvent({
      name: input.name,
      description: input.description,
      date: input.date,
    });
    await this.eventRepository.add(event);
    await this.uow.commit();
    return event;
  }

  async update(
    id: string,
    input: { name?: string; description?: string; date?: Date },
  ) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    if (input.name) {
      event.changeName(input.name);
    }
    if (input.description) {
      event.changeDescription(input.description);
    }
    if (input.date) {
      event.changeDate(input.date);
    }
    await this.eventRepository.add(event);
    await this.uow.commit();
    return event;
  }

  async addSection(
    id: string,
    input: {
      name: string;
      description?: string | null;
      total_spots: number;
      price: number;
    },
  ) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    event.addSection({
      name: input.name,
      description: input.description,
      total_spots: input.total_spots,
      price: input.price,
    });
    await this.eventRepository.add(event);
    await this.uow.commit();
    return event;
  }

  async updateSection(input: {
    name: string;
    description?: string | null;
    event_id: string;
    section_id: string;
  }) {
    const event = await this.eventRepository.findById(input.event_id);
    if (!event) {
      throw new Error('Event not found');
    }
    const sectionId = new EventSectionId(input.section_id);
    event.changeSectionInformation({
      section_id: sectionId,
      name: input.name,
      description: input.description,
    });
    await this.eventRepository.add(event);
    await this.uow.commit();
    return event.sections;
  }

  async findSpots(input: { event_id: string; section_id: string }) {
    const event = await this.eventRepository.findById(input.event_id);
    if (!event) {
      throw new Error('Event not found');
    }
    const section = event?.sections.find((section) =>
      section.id.equals(new EventSectionId(input.section_id)),
    );
    if (!section) {
      throw new Error('Section not found');
    }
    return section.spots;
  }

  async updateLocation(input: {
    location: string;
    event_id: string;
    section_id: string;
    spot_id: string;
  }) {
    const event = await this.eventRepository.findById(input.event_id);
    if (!event) {
      throw new Error('Event not found');
    }
    const sectionId = new EventSectionId(input.section_id);
    const spotId = new EventSpotId(input.spot_id);
    event.changeLocation({
      section_id: sectionId,
      spot_id: spotId,
      location: input.location,
    });
    await this.eventRepository.add(event);
    const section = event.sections.find((section) =>
      section.id.equals(sectionId),
    );
    await this.uow.commit();
    return section?.spots.find((spot) => spot.id.equals(spotId));
  }

  async publishAll(input: { event_id: string }) {
    const event = await this.eventRepository.findById(input.event_id);
    if (!event) {
      throw new Error('Event not found');
    }
    event.publishAll();
    await this.eventRepository.add(event);
    await this.uow.commit();
    return event;
  }
}
