import { GuildInfo } from 'passport-discord';
import { IGuild } from 'src/utils/schema/guildModel';
import { MODELS } from 'src/utils/constants';
import mongoose from 'mongoose';

export interface IUser {
    id: string;
    username: string;
    guilds: IUserGuilds;
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
    username: {
        type: String,
        required: true
    },
    guilds: {
        known: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: MODELS.GUILD
            }
        ],
        unknown: [
            {
                type: Object
            }
        ]
    }
});

export const UserModel = mongoose.model<IUser>(MODELS.USER, userSchema);
