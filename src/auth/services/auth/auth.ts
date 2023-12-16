import { IUser } from 'src/schema/userModel';

export interface AuthenticationProvider {
    validateUser(userDetails: IUser): Promise<IUser>;
    createUser(userDetails: IUser): Promise<IUser>;
    getUser(id: string): Promise<IUser | undefined>;
    exchangeCodeForToken(code: string): Promise<any>;
}
