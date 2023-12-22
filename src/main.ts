import * as passport from 'passport';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    /**
     * Initialize Redis client
     */
    const client = createClient();
    client.connect().catch(console.error);

    /**
     * Initialize session storage
     */
    const redisStore = new RedisStore({ client: client, prefix: 'redis:' });

    app.use(
        session({
            cookie: {
                maxAge: 1000 * 60 * 60 * 24
            },
            secret: process.env.COOKIE_SECRET,
            resave: false,
            saveUninitialized: false,
            store: redisStore
        })
    );

    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true
    });

    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Swagger
     */
    const options = new DocumentBuilder()
        .setTitle('API Adroid_ea dashboard')
        .setDescription('API utilisée par le dashboard Adroid_ea')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(process.env.PORT);
}
bootstrap();
