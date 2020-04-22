import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
    imports: [DatabaseModule, CommonModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}
