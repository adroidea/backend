import { AuthenticationProvider } from 'src/auth/services/auth';
import { HttpService } from '@nestjs/axios';
import { IGuild } from 'src/utils/schema/guildModel';
import { IUser } from 'src/utils/schema/userModel';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { MODELS } from 'src/utils/constants';
import { Model } from 'mongoose';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService implements AuthenticationProvider {
    constructor(
        @InjectModel(MODELS.USER) private readonly userModel: Model<IUser>,
        @InjectModel(MODELS.GUILD) private readonly guildModel: Model<IGuild>,
        private readonly httpService: HttpService
    ) {}

    async validateUser(userDetails: IUser) {
        const user = await this.getUser(userDetails.id);
        return user ? await this.updateUser(userDetails) : await this.createUser(userDetails);
    }

    async createUser(userDetails: IUser): Promise<IUser> {
        const hashAT = createHmac('sha256', process.env.SECRET)
            .update(userDetails.accessToken)
            .digest('hex');

        const hashRT = createHmac('sha256', process.env.SECRET)
            .update(userDetails.refreshToken)
            .digest('hex');

        userDetails.accessToken = hashAT;
        userDetails.refreshToken = hashRT;

        const newUser = new this.userModel(userDetails);
        return await newUser.save();
    }

    async getUser(id: string): Promise<IUser | undefined> {
        return await this.userModel.findOne({ id });
    }

    async updateUser(userDetails: IUser): Promise<IUser> {
        const { id } = userDetails;
        const user = await this.getUser(id);
        if (!user) {
            throw new Error('User not found');
        }

        const hashAT = createHmac('sha256', process.env.SECRET)
            .update(userDetails.accessToken)
            .digest('hex');

        const hashRT = createHmac('sha256', process.env.SECRET)
            .update(userDetails.refreshToken)
            .digest('hex');

        userDetails.accessToken = hashAT;
        userDetails.refreshToken = hashRT;

        return await this.userModel.findOneAndUpdate({ id }, userDetails, { new: true });
    }
}
