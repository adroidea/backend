import { AuthenticationProvider } from 'src/auth/services/auth/auth';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { IGuild } from 'src/utils/schema/guildModel';
import { IUser } from 'src/utils/schema/userModel';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { MODELS } from 'src/utils/constants';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements AuthenticationProvider {
    constructor(
        @InjectModel(MODELS.USER) private readonly userModel: Model<IUser>,
        @InjectModel(MODELS.GUILD) private readonly guildModel: Model<IGuild>,
        private readonly httpService: HttpService
    ) {}

    async validateUser(userDetails: IUser) {
        const user = await this.getUser(userDetails.id);
        if (user) {
            return user;
        }

        const { unknown } = userDetails.guilds;
        const filteredUnknown = unknown.filter(guild => guild.owner);

        for (const guild of filteredUnknown) {
            const knownGuild = await this.guildModel.findOne({ id: guild.id });
            if (knownGuild) {
                userDetails.guilds.known.push(knownGuild);
                filteredUnknown.splice(unknown.indexOf(guild), 1);
            }
        }

        userDetails.guilds.unknown = filteredUnknown;

        return await this.createUser(userDetails);
    }

    async createUser(userDetails: IUser): Promise<IUser> {
        const newUser = new this.userModel(userDetails);
        return await newUser.save();
    }

    async getUser(id: string): Promise<IUser | undefined> {
        return await this.userModel.findOne({ id });
    }

    async exchangeCodeForToken(code: string): Promise<any> {
        const client_id = process.env.DISCORD_CLIENT_ID;
        const client_secret = process.env.DISCORD_CLIENT_SECRET;
        const redirectUri = process.env.DISCORD_CALLBACK_URL;

        const tokenEndpoint = 'https://discord.com/api/oauth2/token';

        const params = new URLSearchParams({
            client_id,
            client_secret,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri
        });

        try {
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.post(tokenEndpoint, params, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
            );

            // Assuming Discord returns JSON data in the response
            return response.data;
        } catch (error) {
            // Handle error
            console.error(error);
            throw new Error('Failed to exchange code for token');
        }
    }
}
