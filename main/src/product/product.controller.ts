import {Controller, Get, Param, Post, HttpService, Injectable} from '@nestjs/common';
import {Ctx, EventPattern, MessagePattern, Payload, RmqContext} from '@nestjs/microservices';
import { ProductService } from './product.service';
import {CreateProduct} from "./dto/product.dto";
import {Product} from "./product.entity";
import {RabbitRPC, RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";


// @Controller('products')
@Injectable()
export class ProductController {
  constructor(
    private productService: ProductService,
    // private httpService: HttpService,
  ) {}



  @RabbitRPC({
    exchange: 'serviceOne',
    routingKey: 'create-product'
  })
  public async createProduct(payload: any, context: any) {
    // console.log(payload)

    let data = {
          product_name : payload.payload.product_name,
          qty : payload.payload.qty,
          created_by : payload.payload.uid,
          update_by : payload.payload.uid
    }
      await this.productService.create(data);

    return {
      status : 'ok',
      message: 'Create Product is done',
    };
  }


  @RabbitRPC({
    exchange: 'serviceOne',
    routingKey: 'all-product'
  })
  public async getAllProduct(payload: any, context: any) {

    let uid = payload.payload
    console.log('masok all product')

    let result = await this.productService.getAllByUser(uid);

    return {
      status : 'ok',
      message: result,
    };
  }




  @RabbitSubscribe({
    exchange: 'serviceOne',
    routingKey: 'delete-product'
  })
  public async deleteProduct(data: any) {
    console.log(data.payload)
    await this.productService.delete(data.payload);
  }





  // @EventPattern('product_created')
  //
  // // async postCreated(post: any) {
  // async postCreated(@Payload() createProduct: CreateProduct, @Ctx() context: RmqContext) {
  //   console.log(createProduct)
  //   // await this.productService.create({
  //   //   title: post.title,
  //   //   content: post.content,
  //   //   likes: post.likes
  //   // })
  //   console.log(context)
  //
  //   // console.log(context.consumer)
  //
  //   // const channel = context.getChannelRef();
  //   // const originalMsg = context.getMessage();
  //   //
  //   // channel.ack(originalMsg);
  //
  //   // return 'okeeboss'
  // }
  // // async create(product: any) {
  // //   console.log(product)
  // //   // await this.productService.create({
  // //   //   id: product.id,
  // //   //   title: product.title,
  // //   //   image: product.image,
  // //   //   likes: product.likes,
  // //   // });
  // //   // const channel = context.getChannelRef();
  // //   // const originalMsg = context.getMessage();
  // //   //
  // //   // channel.ack(originalMsg);
  // //
  // //   // await this.ackMessage(context)
  // //   // return createProduct.title
  // //
  // //
  // // }
  //
  // // @EventPattern('create-category')
  // // async handleCreateCategory(@Payload() createCategoryDto: CreateCategoryDto, @Ctx() context: RmqContext): Promise<void> {
  // //   await this.productService.create(createCategoryDto)
  // //   await this.ackMessage(context)
  // // }
  //
  // @EventPattern('product_updated')
  // async productUpdated(product: any) {
  //   console.log(product)
  //   // await this.productService.update(product.id, {
  //   //   id: product.id,
  //   //   title: product.title,
  //   //   image: product.image,
  //   //   likes: product.likes,
  //   // });
  // }
  // @EventPattern('product_deleted')
  // async productDeleted(id: number) {
  //   // await this.productService.delete(id);
  // }
  //
  // private async ackMessage(context: RmqContext): Promise<void> {
  //   const channel = context.getChannelRef()
  //   const message = context.getMessage()
  //
  //   await channel.ack(message)
  // }
}
