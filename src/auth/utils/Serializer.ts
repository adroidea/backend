import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from 'src/auth/services/auth/auth';
import { IUser } from 'src/schema/userModel';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('AUTH_SERVICE') private readonly userService: AuthenticationProvider) {
        super();
    }
    serializeUser(user: IUser, done: (err: Error, user: IUser) => void) {
        done(null, user);
    }

    async deserializeUser(user: IUser, done: (err: Error, user: IUser) => void) {
        const userDB = await this.userService.getUser(user.id);
        return userDB ? done(null, userDB) : done(null, null);
    }
}