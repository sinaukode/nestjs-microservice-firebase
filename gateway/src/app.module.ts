import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import {FirebaseAdminModule} from "@aginix/nestjs-firebase-admin";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as admin from 'firebase-admin';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.applicationDefault()
      })
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
