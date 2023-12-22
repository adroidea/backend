import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { GuildInfo } from 'passport-discord';
import { IDiscordHttpService } from 'src/discord/interfaces/discord-http';
import { IDiscordService } from 'src/discord/interfaces/discord';
import { SERVICES } from 'src/utils/constants';

@Injectable()
export class DiscordService implements IDiscordService {
    constructor(
        @Inject(SERVICES.DISCORD_HTTP) private readonly discordHttpService: IDiscordHttpService
    ) {}
    getBotGuilds(): Promise<AxiosResponse<GuildInfo[]>> {
        return this.discordHttpService.fetchBotGuilds();
    }

    getUserGuilds(accessToken: string): Promise<AxiosResponse<GuildInfo[]>> {
        return this.discordHttpService.fetchUserGuilds(accessToken);
    }

    async getMutualGuilds(accessToken: string) {
        const { data: botGuilds } = await this.getBotGuilds();
        const { data: userGuilds } = await this.getUserGuilds(accessToken);

        const adminUserGuilds = userGuilds.filter(
            (guild: GuildInfo) => (guild.permissions & 0x8) === 0x8
        );

        const mutualGuilds = adminUserGuilds.filter((adminGuild: GuildInfo) =>
            botGuilds.some((botGuild: GuildInfo) => botGuild.id === adminGuild.id)
        );

        const nonSharedGuilds = adminUserGuilds.filter(
            (adminGuild: GuildInfo) =>
                !botGuilds.some((botGuild: GuildInfo) => botGuild.id === adminGuild.id)
        );

        return {
            mutualGuilds,
            nonSharedGuilds
        };
    }
}
