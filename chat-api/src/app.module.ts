import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

@Module({
    imports: [DatabaseModule, AuthModule, UserModule, CommonModule],
    providers: [AppGateway],
})
export class AppModule {}
