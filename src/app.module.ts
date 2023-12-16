import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GuildModule } from './guild/guild.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

let path = '.env.development';

if (process.env.NODE_ENV === 'PRODUCTION') {
    path = '.env.production';
}

dotenv.config({ path });

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI),
        PassportModule.register({ session: true }),
        GuildModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
