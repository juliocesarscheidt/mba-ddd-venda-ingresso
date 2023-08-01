import { EntityManager } from '@mikro-orm/mysql';
import { IUnitOfWork } from '../application/unit-of-work.interface';
import { AggregateRoot } from '../domain/aggregate-root';

export class UnitOfWorkMikroOrm implements IUnitOfWork {
  constructor(private entityManager: EntityManager) {}

  beginTransaction(): Promise<void> {
    return this.entityManager.begin();
  }

  completeTransaction(): Promise<void> {
    return this.entityManager.commit();
  }

  rollbackTransaction(): Promise<void> {
    return this.entityManager.rollback();
  }

  runTransaction<T>(callback: () => Promise<T>): Promise<T> {
    return this.entityManager.transactional(callback);
  }

  commit(): Promise<void> {
    return this.entityManager.flush();
  }

  async rollback(): Promise<void> {
    this.entityManager.clear();
  }

  getAggregateRoots(): AggregateRoot[] {
    return [
      ...this.entityManager.getUnitOfWork().getPersistStack(),
      ...this.entityManager.getUnitOfWork().getRemoveStack(),
    ] as AggregateRoot[];
  }
}
