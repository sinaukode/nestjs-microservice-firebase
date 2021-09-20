import {Injectable} from '@nestjs/common';
import {FirebaseAuthenticationService} from "@aginix/nestjs-firebase-admin";
import {Users} from "./users.entity";
import {getConnection, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {PubMessageService} from "../infra/Pub/pub.message.service";
import firebase from "firebase/compat";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private readonly firebaseAuth: FirebaseAuthenticationService,
        private readonly pubServiceMessage: PubMessageService,
    ) {
    }

    async create(data): Promise<any> {

        try {

            const {displayName, password, email, role} = data;
            console.log(data)
            const {uid} = await this.firebaseAuth.createUser({
                displayName,
                password,
                email
            });

            // console.log(uid)

            await this.firebaseAuth.setCustomUserClaims(uid, {role});

            let user = await this.firebaseAuth.getUser(uid);
            const newUser = new Users;
            newUser.uid = user.uid;
            newUser.email = user.email;
            newUser.displayName = user.email;
            newUser.role = role;
            newUser.status = 1;

            // console.log(`newUser`)
            // console.log(newUser)
            await this.usersRepository.insert(newUser);

            // console.log(createdUser)

            return uid

        } catch (e) {
            console.log(e)
            return 'nok'
        }
    }


    async disableUser(data): Promise<any> {

        try {
            console.log(data)
            await getConnection()
                .createQueryBuilder()
                .update(Users)
                .set({ status: 0})
                .where("email = :email", { email: data })
                .execute();



            return 'ok'
        } catch (e) {
            console.log(e)
            return 'nok'
        }
    }


    public async sendMessageService(route:string,payload : string): Promise<void | object> {
        const response = await this.pubServiceMessage.sendMessageRcp({
            exchange: 'serviceOne',
            routingKey: route,
        },{
            payload
        });
        return response;
    }

    public async publishtoService(route:string,payload : string): Promise<void | object> {
        const response = await this.pubServiceMessage.sendMessagePub({
            exchange: 'serviceOne',
            routingKey: route,
        },{
            payload
        });
        return response;
    }
}


