import { DiscordController } from 'src/discord/controllers/discord.controller';
import { DiscordHttpService } from 'src/discord/services/discord-http.service';
import { DiscordService } from 'src/discord/services/discord.service';
import { Module } from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';

@Module({
    controllers: [DiscordController],
    providers: [
        {
            provide: SERVICES.DISCORD,
            useClass: DiscordService
        },
        {
            provide: SERVICES.DISCORD_HTTP,
            useClass: DiscordHttpService
        }
    ],
    exports: []
})
export class DiscordModule {}

