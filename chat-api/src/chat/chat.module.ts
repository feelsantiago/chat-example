import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';
import { ChatController } from './chat.controller';

@Module({
    imports: [DatabaseModule, CommonModule],
    controllers: [ChatController],
})
export class ChatModule {}
