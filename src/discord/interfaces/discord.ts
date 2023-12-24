import { GuildInfo, Profile } from 'passport-discord';
import { AxiosResponse } from 'axios';

export interface IDiscordService {
    getBotGuilds(): Promise<AxiosResponse<GuildInfo[]>>;
    getUserGuilds(accessToken: string): Promise<AxiosResponse<GuildInfo[]>>;
    getMutualGuilds(accessToken: string): Promise<any>;
    getUser(accessToken: string): Promise<Profile>;
}
