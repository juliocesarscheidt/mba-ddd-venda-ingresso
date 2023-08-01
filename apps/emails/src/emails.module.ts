import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [EmailsController],
  providers: [EmailsService, ConsumerService],
  exports: [],
})
export class EmailsModule {}
