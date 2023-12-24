import { GuildInfo, Profile } from 'passport-discord';
import axios, { AxiosResponse } from 'axios';
import { IDiscordHttpService } from 'src/discord/interfaces/discord-http';
import { Injectable } from '@nestjs/common';

const DISCORD_URI = 'https://discord.com/api/v10/users/@me/guilds';

@Injectable()
export class DiscordHttpService implements IDiscordHttpService {
    fetchBotGuilds(): Promise<AxiosResponse<GuildInfo[]>> {
        return axios.get<GuildInfo[]>(DISCORD_URI, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`
            }
        });
    }

    fetchUserGuilds(accessToken: string): Promise<AxiosResponse<GuildInfo[]>> {
        return axios.get<GuildInfo[]>(DISCORD_URI, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    fetchUser(accessToken: string): Promise<AxiosResponse<Profile>> {
        return axios.get<Profile>('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}
