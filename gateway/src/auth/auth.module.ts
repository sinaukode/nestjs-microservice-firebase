import { Module } from "@nestjs/common";
// import { PassportModule } from "@nestjs/passport";
// import { UserModule } from "../user/user.module";
// import { FirebaseStrategy } from "./strategies/firebase.strategy";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        // PassportModule,
        // UserModule
    ],
    providers: [AuthService],
    // exports: [FirebaseStrategy],
    controllers: [AuthController],
})
export class AuthModule { }
