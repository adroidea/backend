import { GuildInfo } from 'passport-discord';
import { IGuild } from 'src/utils/schema/guildModel';
import { MODELS } from 'src/utils/constants';
import mongoose from 'mongoose';

export interface IUser {
    id: string;

    accessToken: string;
    refreshToken: string;
}

export interface IUserGuilds {
    known: IGuild[];
    unknown: GuildInfo[];
}

export const userSchema = new mongoose.Schema<IUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
});

export const UserModel = mongoose.model<IUser>(MODELS.USER, userSchema);
