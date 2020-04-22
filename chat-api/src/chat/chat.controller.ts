import { Controller, Get } from '@nestjs/common';
import { UserInfo } from '../auth/auth-types';
import { RepositoryService } from '../database/repository.service';
import { User } from '../auth/decorators/user.decorator';
import { Chat } from '../database/schemas/chat.schema';

@Controller('chat')
export class ChatController {
    constructor(private readonly repositoryService: RepositoryService) {}

    @Get()
    public async getChats(@User() user: UserInfo): Promise<Chat[]> {
        console.log(user);
        return this.repositoryService.chats.find({ users: user._id });
    }
}
