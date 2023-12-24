import { GuildInfo, Profile } from 'passport-discord';
import { AxiosResponse } from 'axios';

export interface IDiscordHttpService {
    fetchBotGuilds(): Promise<AxiosResponse<GuildInfo[]>>;
    fetchUserGuilds(accessToken: string): Promise<AxiosResponse<GuildInfo[]>>;
    fetchUser(accessToken: string): Promise<AxiosResponse<Profile>>;
}
