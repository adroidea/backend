import { MODELS, SERVICES } from 'src/utils/constants';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { DiscordStrategy } from 'src/auth/strategies';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSerializer } from 'src/auth/utils/Serializer';
import { guildSchema } from 'src/utils/schema/guildModel';
import { userSchema } from 'src/utils/schema/userModel';

@Module({
    controllers: [AuthController],
    providers: [
        DiscordStrategy,
        SessionSerializer,
        {
            provide: SERVICES.AUTH,
            useClass: AuthService
        }
    ],
    imports: [
        MongooseModule.forFeature([{ name: MODELS.USER, schema: userSchema }]),
        MongooseModule.forFeature([{ name: MODELS.GUILD, schema: guildSchema }]),
        HttpModule
    ]
})
export class AuthModule {}
