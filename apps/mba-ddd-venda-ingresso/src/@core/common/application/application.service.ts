import { DomainEventManager } from '../domain/domain-event-manager';
import { IUnitOfWork } from './unit-of-work.interface';

export class ApplicationService {
  constructor(
    private uow: IUnitOfWork,
    private domainEventManager: DomainEventManager,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async start() {}

  async finish() {
    const aggregateRoots = this.uow.getAggregateRoots();
    for (const aggregateRoot of aggregateRoots) {
      await this.domainEventManager.publish(aggregateRoot);
    }
    await this.uow.commit();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async fail() {}

  async run<T>(callback: () => Promise<T>): Promise<T> {
    await this.start();
    try {
      const result = await callback();
      await this.finish();
      return result;
    } catch (error) {
      await this.fail();
      throw error;
    }
  }
}
