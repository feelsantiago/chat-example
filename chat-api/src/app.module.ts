import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [DatabaseModule, AuthModule, UserModule, ChatModule, CommonModule],
    providers: [AppGateway],
})
export class AppModule {}
