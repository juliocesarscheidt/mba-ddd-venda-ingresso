import { PartnerCreated } from '../../../../../@core/events/domain/domain-events/partner-created.event';
import { DomainEventManager } from '../../../../../@core/common/domain/domain-event-manager';
import { IPartnerRepository } from '../../../../../@core/events/domain/repositories/partner-repository.interface';
import { IDomainEventHandler } from '../../../../../@core/common/application/domain-event-handler.interface';
import { PartnerNameChanged } from '../../../../../@core/events/domain/domain-events/partner-name-changed.event';

export class MyHandlerHandler implements IDomainEventHandler {
  constructor(
    private partnerRepo: IPartnerRepository,
    private domainEventManager: DomainEventManager,
  ) {}

  async handle(event: PartnerCreated): Promise<void> {
    console.log(event);
    // manipular agregados
    // this.partnerRepo.add()
    // await this.domainEventManager.publish(agregado)
  }

  static listensTo(): string[] {
    return [PartnerCreated.name, PartnerNameChanged.name];
  }
}
