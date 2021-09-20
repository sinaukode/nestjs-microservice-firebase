/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {RabbitRPC, RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { SubMessageService } from './sub.message.service';
import { PubMessageService } from '../Pub/pub.message..service';
import {ProductService} from "../../product.service";

@Injectable()
export class SubMessageController {
  constructor(
    private readonly messageService: SubMessageService,
    private pubMessage: PubMessageService,
    private readonly productService : ProductService,
  ) {}

  @RabbitRPC({
    exchange: 'serviceOne',
    routingKey: '1q1'
    // queue: 'serviceOne_queue1',
  })
  public async teste(payload: any, context: any) {
    // console.dir(payload)
    console.log(`${Date.now()} service One health `);
    let data =  await this.productService.all();
    return {
      message: data
    };
  }

  @RabbitSubscribe({
    exchange: 'serviceOne',
    routingKey: 'test-route'
  })
  public async teste2(payload: any, context: any) {
    console.log(payload)
    console.log(`${Date.now()} hahahahahahhaa`);
    // const response = await this.pubMessage.sendMessageServiceTwo();
    //
    // return {
    //   messageServiceOne: 'Service One Ok',
    //   messageServiceTwo: response,
    // };
  }
}
