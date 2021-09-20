import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {getConnection, Repository} from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(data): Promise<Product> {
    return this.productRepository.save(data);
  }

  async getAllByUser(uid: string): Promise<any> {
    // console.log(uid)
    // console.log(`---uid--`)
    try{
      let res = await getConnection().getRepository(Product).createQueryBuilder()
          .where("created_by = :uid", { uid: uid })
          .getRawMany()

      console.log(res)

      return res
    }catch (e) {
      return 'data not found'
    }
    // return this.productRepository.findOne({ created_at : uid });

  }

  async update(id: number, data): Promise<any> {
    return this.productRepository.update(id, data);
  }

  async delete(data: string): Promise<any> {
    // console.log()

    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where("created_by = :data", { data: data })
        .execute();

    return 'success delete'
    // return this.productRepository.delete(email);
  }
}
