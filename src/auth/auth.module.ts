import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { DiscordStrategy } from 'src/auth/strategies';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSerializer } from 'src/auth/utils/Serializer';
import { guildSchema } from 'src/schema/guildModel';
import { userSchema } from 'src/schema/userModel';

@Module({
    controllers: [AuthController],
    providers: [
        DiscordStrategy,
        SessionSerializer,
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService
        }
    ],
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
        MongooseModule.forFeature([{ name: 'Guild', schema: guildSchema }]),
        HttpModule
    ]
})
export class AuthModule {}
