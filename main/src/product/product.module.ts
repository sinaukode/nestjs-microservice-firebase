import { Module, HttpModule } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {MessageHandlerErrorBehavior, RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {SubMessageService} from "./Infra/Sub/sub.message.service";
import {PubMessageService} from "./Infra/Pub/pub.message..service";
import {subscribeOn} from "rxjs";
import {SubMessageController} from "./Infra/Sub/sub.message.RabbitController";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    HttpModule,
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
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
