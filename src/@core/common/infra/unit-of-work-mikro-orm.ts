import { EntityManager } from '@mikro-orm/mysql';
import { IUnitOfWork } from '../application/unit-of-work.interface';

export class UnitOfWorkMikroOrm implements IUnitOfWork {
  constructor(private entityManager: EntityManager) {}

  commit(): Promise<void> {
    return this.entityManager.flush();
  }

  async rollback(): Promise<void> {
    this.entityManager.clear();
  }
}
