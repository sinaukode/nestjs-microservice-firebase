import {Body, Controller, Post,Request} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('login')
    createToken(@Body() body: any, @Request() req) {
        console.log(body);
        const data = this.authService.login(body.email, body.password);
        // console.log(data['user']);
        return data;
    }
}
