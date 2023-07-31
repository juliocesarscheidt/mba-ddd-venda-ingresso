import { Module } from '@nestjs/common';
import { ApplicationService } from '../@core/common/application/application.service';
import { IUnitOfWork } from '../@core/common/application/unit-of-work.interface';
import { DomainEventManager } from '../@core/common/domain/domain-event-manager';
import { DomainEventsModule } from '../domain-events/domain-events.module';

@Module({
  imports: [DomainEventsModule],
  controllers: [],
  providers: [
    {
      provide: ApplicationService,
      useFactory: (uow: IUnitOfWork, domainEventManager: DomainEventManager) =>
        new ApplicationService(uow, domainEventManager),
      inject: ['IUnitOfWork', DomainEventManager],
    },
  ],
  exports: [ApplicationService],
})
export class ApplicationModule {}
