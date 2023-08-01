import { ApplicationService } from '../../../@core/common/application/application.service';
import { Partner } from '../domain/entities/partner.entity';
import { IPartnerRepository } from '../domain/repositories/partner-repository.interface';

export class PartnerService {
  constructor(
    private partnerRepository: IPartnerRepository,
    private applicationService: ApplicationService,
  ) {}

  list() {
    return this.partnerRepository.findAll();
  }

  async create(input: { name: string }) {
    await this.applicationService.run(async () => {
      const partner = Partner.create(input);
      this.partnerRepository.add(partner);
      return partner;
    });
  }

  async update(id: string, input: { name?: string }) {
    await this.applicationService.run(async () => {
      const partner = await this.partnerRepository.findById(id);
      if (!partner) {
        throw new Error('Partner not found');
      }
      if (!input.name) {
        return partner;
      }
      partner.changeName(input.name);
      this.partnerRepository.add(partner);

      return partner;
    });
  }
}
