import { GuildInfo } from 'passport-discord';
import { IGuild } from 'src/schema/guildModel';
import mongoose from 'mongoose';

export interface IUser {
    id: string;
    username: string;
    guilds: IUserGuilds;
    accent_color?: number;
    avatar?: string;
    banner?: string;
}

export interface IUserGuilds {
    known: IGuild[];
    unknown: GuildInfo[];
}

export const userSchema = new mongoose.Schema<IUser>({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    guilds: {
        known: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Guild'
            }
        ],
        unknown: [
            {
                type: Object
            }
        ]
    },
    accent_color: {
        type: Number,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    banner: {
        type: String,
        required: false
    }
});

export const GuildModel = mongoose.model<IUser>('User', userSchema);
