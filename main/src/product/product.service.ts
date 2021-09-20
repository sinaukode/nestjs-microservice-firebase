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

  async get(id: number): Promise<Product> {
    return this.productRepository.findOne({ id });
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
