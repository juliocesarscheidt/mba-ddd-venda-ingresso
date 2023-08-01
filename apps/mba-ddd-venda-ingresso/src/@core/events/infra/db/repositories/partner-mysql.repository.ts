import { EntityManager } from '@mikro-orm/mysql';
import {
  Partner,
  PartnerId,
} from '../../../../../@core/events/domain/entities/partner.entity';
import { IPartnerRepository } from '../../../domain/repositories/partner-repository.interface';

export class PartnerMysqlRepository implements IPartnerRepository {
  constructor(private entityManager: EntityManager) {}

  async add(entity: Partner): Promise<void> {
    this.entityManager.persist(entity);
  }

  findById(id: string | PartnerId): Promise<Partner> {
    return this.entityManager.findOne(Partner, {
      id: typeof id === 'string' ? new PartnerId(id) : id,
    });
  }

  findAll(): Promise<Partner[]> {
    return this.entityManager.find(Partner, {});
  }

  async delete(entity: Partner): Promise<void> {
    this.entityManager.remove(entity);
  }
}
