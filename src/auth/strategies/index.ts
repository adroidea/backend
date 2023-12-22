import { Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-discord';
import { AuthenticationProvider } from 'src/auth/services/auth/auth';
import { PassportStrategy } from '@nestjs/passport';
import { SERVICES } from 'src/utils/constants';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(SERVICES.AUTH) private readonly authService: AuthenticationProvider) {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: ['identify', 'guilds']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { id } = profile;
        return this.authService.validateUser({
            id,
            accessToken,
            refreshToken
        });
    }
}
