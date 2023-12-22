import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/guards';
import { GuildService } from 'src/guild/guild.service';
import { IGuild } from 'src/utils/schema/guildModel';
import { IUserGuilds } from 'src/utils/schema/userModel';
import { ROUTES } from 'src/utils/constants';

@ApiTags('guilds')
@Controller(ROUTES.GUILDS)
export class GuildController {
    constructor(private readonly guildService: GuildService) {}

    @Get('multiple')
    @UseGuards(AuthenticatedGuard)
    async getUserGuilds(@Req() req: any): Promise<IUserGuilds> {
        const userGuilds: IUserGuilds = req.user.guilds;
        return this.guildService.getUserGuilds(userGuilds);
    }

    @Get('all')
    @UseGuards(AuthenticatedGuard)
    async getAllGuilds(): Promise<IGuild[]> {
        return this.guildService.getAllGuilds();
    }

    @Get(':guildId')
    @UseGuards(AuthenticatedGuard)
    async getGuildSettings(@Param('guildId') guildId: string): Promise<IGuild | null> {
        try {
            const guild = await this.guildService.getGuildById(guildId);
            return guild;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    @Patch(':guildId')
    @UseGuards(AuthenticatedGuard)
    async GuildUpdate(
        @Param('guildId') guildId: string,
        @Body() guildData: Record<string, any>
    ): Promise<IGuild | null> {
        return this.guildService.updateGuild(guildId, guildData);
    }
}
