import { AuthenticatedGuard, DiscordAuthGuard } from 'src/auth/guards';
import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationProvider } from 'src/auth/services/auth/auth';
import { Response } from 'express';

@ApiTags('authentification')
@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {}

    @Get('login')
    @UseGuards(DiscordAuthGuard)
    login() {
        return 'login';
    }

    @Get('Redirect')
    @UseGuards(DiscordAuthGuard)
    async redirect(@Req() req: any, @Res() res: Response) {
        if (req.user) {
            const { code }: { code: string } = req.query;
            console.log(code);
            try {
                // Exchange the code for an access token and additional data
                const tokenResponse = await this.authService.exchangeCodeForToken(code);
                console.log(tokenResponse);

                res.sendStatus(200);
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(401);
        }
    }

    @Get('status')
    @UseGuards(AuthenticatedGuard)
    status(@Req() req: any) {
        return req.user;
    }

    @Get('logout')
    @UseGuards(AuthenticatedGuard)
    logout(@Req() req: any, @Res() res: Response) {
        req.logout(err => {
            if (err) {
                console.log('Logout error', err);
                return res.send('logout failed');
            }
            return res.sendStatus(200);
        });
    }
}
