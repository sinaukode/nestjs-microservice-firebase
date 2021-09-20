import {
  RabbitMQModule,
  MessageHandlerErrorBehavior,
} from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { SubMessageService } from './Infra/Sub/sub.message.service';
import { SubMessageController } from './Infra/Sub/sub.message.RabbitController';
import { PubMessageService } from './Infra/Pub/pub.message..service';
import {ProductService} from "./product.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {ProductController} from "./product.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    RabbitMQModule.build({
      exchanges: [
        {
          name: 'serviceOne',
          type: 'direct',
        },
      ],
      uri: 'amqp://localhost:5672',
      defaultSubscribeErrorBehavior: MessageHandlerErrorBehavior.NACK,
      defaultRpcErrorBehavior: MessageHandlerErrorBehavior.NACK,
    }),
  ],
  providers: [ProductService,ProductController],
  controllers: [],
  // SubMessageService, PubMessageService,SubMessageController
})
export class InfraModule {}
