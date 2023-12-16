import { IGuild } from 'src/schema/guildModel';
import { IUserGuilds } from 'src/schema/userModel';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class GuildService {
    constructor(@InjectModel('Guild') private readonly GuildModel: Model<IGuild>) {}

    async getUserGuilds(guilds: IUserGuilds): Promise<IUserGuilds> {
        let { known, unknown } = guilds;

        unknown = unknown.filter(guild => guild.owner);
        for (const guild of unknown) {
            const knownGuild = await this.getGuildById(guild.id);
            if (knownGuild) {
                known.push(knownGuild);
                unknown.splice(unknown.indexOf(guild), 1);
            }
        }
        return { known, unknown };
    }

    async getAllGuilds(): Promise<IGuild[]> {
        try {
            const guilds = await this.GuildModel.find().exec();
            return guilds;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getGuildById(guildId: string): Promise<IGuild | null> {
        try {
            const guild = await this.GuildModel.findOne({ id: guildId }).exec();
            return guild;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateGuild(guildId: string, guildData: Record<string, any>): Promise<IGuild | null> {
        try {
            const guild = await this.GuildModel.findOne({ id: guildId }).exec();
            if (!guild) throw new Error('Guild not found');

            for (const key in guildData) {
                if (guildData.hasOwnProperty(key)) {
                    if (guild.modules.hasOwnProperty(key)) {
                        Object.assign(guild.modules[key], guildData[key]);
                    }
                }
            }

            const updatedGuild = await guild.save();
            return updatedGuild;
        } catch (error) {
            console.error('Error updating guild:', error);
            return null;
        }
    }
}
