import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [],
    providers: [AppGateway],
})
export class AppModule {}
