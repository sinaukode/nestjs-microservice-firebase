
import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import {InfraModule} from "../infra/infra.module";
import {AuthMiddleware} from "../middleware/auth.middleware";

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraModule
  ],
  controllers: [ProductController],
  exports:[ProductService],
  providers: [ProductService],
})
export class ProductModule {

  public configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes({path: '/products', method: RequestMethod.ALL});
  }
}





