import { Injectable } from '@nestjs/common';

import {PubMessageService} from "../infra/Pub/pub.message.service";

@Injectable()
export class ProductService {
  constructor(
    // @InjectRepository(Product)
    // private readonly productRepository: Repository<Product>,
    private readonly pubServiceMessage: PubMessageService
  ) {}

  // async all(): Promise<Product[]> {
  //   return this.productRepository.find();
  // }

  public async sendMessageService(route:string,payload : string): Promise<void | object> {
    const response = await this.pubServiceMessage.sendMessageRcp({
      exchange: 'serviceOne',
      routingKey: route,
    },{
      payload
    });
    return response;
  }

  public async publishtoService(route:string,payload : string): Promise<void | object> {
    const response = await this.pubServiceMessage.sendMessagePub({
      exchange: 'serviceOne',
      routingKey: route,
    },{
      payload
    });
    return response;
  }


  // async create(data): Promise<Product> {
  //   return this.productRepository.save(data);
  // }
  //
  // async get(id: number): Promise<Product> {
  //   return this.productRepository.findOne({ id });
  // }
  //
  // async update(id: number, data): Promise<any> {
  //   return this.productRepository.update(id, data);
  // }
  //
  // async delete(id: number): Promise<any> {
  //   return this.productRepository.delete(id);
  // }
}
