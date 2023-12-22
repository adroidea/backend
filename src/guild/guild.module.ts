import { GuildController } from './guild.controller';
import { GuildService } from './guild.service';
import { MODELS } from 'src/utils/constants';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { guildSchema } from 'src/utils/schema/guildModel';

@Module({
    providers: [GuildService],
    controllers: [GuildController],
    imports: [MongooseModule.forFeature([{ name: MODELS.GUILD, schema: guildSchema }])]
})
export class GuildModule {}
