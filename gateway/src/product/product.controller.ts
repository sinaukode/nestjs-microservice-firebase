import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post, Req, Res, UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';
import {RolesGuard} from "../middleware/auth.guard";
import {Roles} from "../middleware/role.decorator";
import { Request,Response } from 'express';
// import {PubMessageService} from "../infra/Pub/pub.message.service";


//GATEWAY PRODUCT


@UseGuards(RolesGuard)
@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
  ) {}


  @Post()
  @Roles('admin')
  async createProduct(@Req() req ,@Res() res: Response,@Body() payload: any): Promise<any> {

    payload.uid = req.user.uid

    let data =  await this.productService.sendMessageService('create-product',payload);
    console.log(data)
    res.json({
      status : 'ok',
      data : data
    })
  }


  @Get()
  @Roles('admin')
  async getAllProduct(@Req() req ,@Res() res: Response): Promise<any> {
    console.log(`get all product`)
    let uid = req.user.uid
    console.log(uid)
    let data =  await this.productService.sendMessageService('all-product',uid);
    console.log(data)
    res.json({
      status : 'ok',
      data : data
    })
  }

}
