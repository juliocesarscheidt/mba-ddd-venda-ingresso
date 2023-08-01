import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Job } from 'bull';
import { IIntegrationEvent } from '../@core/common/domain/integration-event';
import { Process, Processor } from '@nestjs/bull';

@Processor('integration-events')
export class IntegrationEventsPublisher {
  constructor(private amqpConnection: AmqpConnection) {}

  @Process()
  async handle(job: Job<IIntegrationEvent>) {
    await this.amqpConnection.publish(
      'amq.direct', // exchange
      job.data.event_name, // routingKey
      job.data, // message
    );
    return {};
  }
}
