import { AuthenticatedGuard, DiscordAuthGuard } from 'src/auth/guards';
import { Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationProvider } from 'src/auth/services/auth';
import { Response } from 'express';

@ApiTags('authentification')
@Controller(ROUTES.AUTH)
export class AuthController {
    constructor(@Inject(SERVICES.AUTH) private readonly authService: AuthenticationProvider) {}

    @Get('login')
    @UseGuards(DiscordAuthGuard)
    login() {}

    @Get('redirect')
    @UseGuards(DiscordAuthGuard)
    async redirect(@Req() req: any, @Res() res: Response) {
        if (req.user) {
            res.redirect('http://localhost:3000/dashboard');
        } else {
            res.sendStatus(401);
        }
    }

    @Get('status')
    @UseGuards(AuthenticatedGuard)
    status(@Req() req: any) {
        return { id: req.user.id };
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
