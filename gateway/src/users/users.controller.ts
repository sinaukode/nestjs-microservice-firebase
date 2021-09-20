import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {Users} from "./users.entity";
import {UserDTO} from "./dto/user.dto";
import {RolesGuard} from "../middleware/auth.guard";
import {Roles} from "../middleware/role.decorator";
import {Request, Response} from "express";

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,

    ) {}

    @Post()
    public async create(@Body() userDto: UserDTO): Promise<any> {

        try {
            let result = await this.usersService.create(userDto)

            return {result};
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }


    @Roles('admin')
    @Post('disable')
    // async createProduct(@Req() req: Request ,@Res() res: Response,@Body() payload: any): Promise<any> {
    async completeProfile(@Body() payload: any, @Req() req ) {
    // public async disableUsers(@Body() payload: any, @Req() req : Request) {


        // console.log(req.user)
        try {
            let uid = req.user.uid
            if(payload){
                //update status user & delete product

                let result = await this.usersService.disableUser(uid)
                await this.usersService.publishtoService('delete-product',uid);

                return {result};
            }else{
                return 'nok'
            }


        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }


}
