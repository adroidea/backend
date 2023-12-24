import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { AuthenticatedGuard } from 'src/auth/guards';
import { IDiscordService } from 'src/discord/interfaces/discord';
import { IUser } from 'src/utils/schema/userModel';

@Controller(ROUTES.DISCORD)
export class DiscordController {
    constructor(@Inject(SERVICES.DISCORD) private readonly discordService: IDiscordService) {}

    @Get('guilds')
    @UseGuards(AuthenticatedGuard)
    async getMutualGuilds(@Req() req: any) {
        if (req.user) {
            return this.discordService.getMutualGuilds((req.user as IUser).accessToken);
        }
    }

    @Get('user')
    @UseGuards(AuthenticatedGuard)
    async getUser(@Req() req: any) {
        if (req.user) {
            return this.discordService.getUser((req.user as IUser).accessToken);
        }
    }
}
