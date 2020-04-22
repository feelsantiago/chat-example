import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserInfo } from '../auth/auth-types';
import { RepositoryService } from '../database/repository.service';
import { User } from '../auth/decorators/user.decorator';
import { ChatResponse } from './chat-types';
import { ChatService } from './chat.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private readonly repositoryService: RepositoryService, private readonly chatService: ChatService) {}

    @Get()
    public async getChats(@User() user: UserInfo): Promise<ChatResponse[]> {
        console.log(user);
        const chats = await this.repositoryService.chats.find({ users: user._id });
        return this.chatService.createChatResponse(chats, user._id);
    }
}
