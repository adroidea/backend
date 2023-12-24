import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from 'src/auth/services/auth';
import { IUser } from 'src/utils/schema/userModel';
import { PassportSerializer } from '@nestjs/passport';
import { SERVICES } from 'src/utils/constants';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject(SERVICES.AUTH) private readonly userService: AuthenticationProvider) {
        super();
    }
    serializeUser(user: IUser, done: (err: Error, user: IUser) => void) {
        done(null, user);
    }

    async deserializeUser(user: IUser, done: (err: Error, user: IUser) => void) {
        try {
            const userDB = await this.userService.getUser(user.id);
            if (userDB) {
                return done(null, userDB);
            }
            const newUser = await this.userService.createUser(user);
            return done(null, newUser);
        } catch (err) {
            done(err, null);
        }
    }
}
