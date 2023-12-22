import { AxiosResponse } from 'axios';
import { GuildInfo } from 'passport-discord';

export interface IDiscordHttpService {
    fetchBotGuilds(): Promise<AxiosResponse<GuildInfo[]>>;
    fetchUserGuilds(accessToken: string): Promise<AxiosResponse<GuildInfo[]>>;
}
