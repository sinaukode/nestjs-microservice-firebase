import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {ProductService} from "../product/product.service";
import {PubMessageService} from "../infra/Pub/pub.message.service";
import {InfraModule} from "../infra/infra.module";
import {AuthMiddleware} from "../middleware/auth.middleware";


@Module({
    imports: [TypeOrmModule.forFeature([Users]),InfraModule],
    providers: [UsersService],
    exports: [UsersService,],
    controllers: [UsersController],
})
export class UsersModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({path: '/users', method: RequestMethod.ALL});
    }
}

