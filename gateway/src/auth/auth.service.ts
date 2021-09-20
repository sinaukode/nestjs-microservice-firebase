import { Injectable } from '@nestjs/common';
import { auth } from './firebase/firebase';
import {FirebaseAuthenticationService} from "@aginix/nestjs-firebase-admin";

@Injectable()
export class AuthService {
    constructor(private readonly firebaseAuth: FirebaseAuthenticationService){}
    // private readonly auth2: FirebaseStrategy,

    async login(email: string, password: string): Promise<any> {
        let res = {
            status: '',
            data: null,
        };
        try {
            const data = await auth.signInWithEmailAndPassword(email, password);
            const token = await data.user.getIdToken();
            // console.log(token);
            // console.log(data.user.User.accessToken)
            // return token;
            res.status = 'ok';
            res.data = token;
        } catch (e) {
            res.status = 'nok';
            res.data = 'user not found';
        }
        return res;
    }
}
