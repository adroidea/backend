import { IUser } from 'src/utils/schema/userModel';

export interface AuthenticationProvider {
    validateUser(userDetails: IUser): Promise<IUser>;
    createUser(userDetails: IUser): Promise<IUser>;
    getUser(id: string): Promise<IUser | undefined>;
    updateUser(userDetails: IUser): Promise<IUser | undefined>;
}
