import { IUnitOfWork } from '../../../@core/common/application/unit-of-work.interface';
import { Partner } from '../domain/entities/partner.entity';
import { IPartnerRepository } from '../domain/repositories/partner-repository.interface';

export class PartnerService {
  constructor(
    private partnerRepository: IPartnerRepository,
    private uow: IUnitOfWork,
  ) {}

  list() {
    return this.partnerRepository.findAll();
  }

  async create(input: { name: string }) {
    const partner = Partner.create(input);
    this.partnerRepository.add(partner);
    await this.uow.commit();
    return partner;
  }

  async update(id: string, input: { name?: string }) {
    const partner = await this.partnerRepository.findById(id);
    if (!partner) {
      throw new Error('Partner not found');
    }
    if (!input.name) {
      return partner;
    }
    partner.changeName(input.name);
    this.partnerRepository.add(partner);
    await this.uow.commit();
    return partner;
  }
}
