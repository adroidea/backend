import { AxiosResponse } from 'axios';
import { GuildInfo } from 'passport-discord';

export interface IDiscordService {
    getBotGuilds(): Promise<AxiosResponse<GuildInfo[]>>;
    getUserGuilds(accessToken: string): Promise<AxiosResponse<GuildInfo[]>>;
    getMutualGuilds(accessToken: string): Promise<any>;
}
