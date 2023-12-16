import { GuildController } from './guild.controller';
import { GuildService } from './guild.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { guildSchema } from 'src/schema/guildModel';

@Module({
    providers: [GuildService],
    controllers: [GuildController],
    imports: [MongooseModule.forFeature([{ name: 'Guild', schema: guildSchema }])]
})
export class GuildModule {}
