import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserModelToken, ChatModelToken } from './database.providers';
import { UserSchema } from './schemas/user.schema';
import { ChatSchema } from './schemas/chat.schema';

@Injectable()
export class RepositoryService {
    constructor(
        @Inject(UserModelToken) private readonly userModel: Model<UserSchema>,
        @Inject(ChatModelToken) private readonly chatModel: Model<ChatSchema>,
    ) {}

    public get users(): Model<UserSchema> {
        return this.userModel;
    }

    public get chats(): Model<ChatSchema> {
        return this.chatModel;
    }
}
