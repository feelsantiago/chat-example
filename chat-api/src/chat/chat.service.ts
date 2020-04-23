import { Injectable } from '@nestjs/common';
import { ChatSchema } from '../database/schemas/chat.schema';
import { ChatResponse } from './chat-types';

@Injectable()
export class ChatService {
    public createChatResponse(chats: ChatSchema[], requestId: string): ChatResponse[] {
        if (!chats || chats.length === 0) {
            return [];
        }

        const response = chats.map((chat) => {
            const user = chat.users.filter((_id) => _id !== requestId).pop();
            const lastMessage = chat.messages.pop().text;

            return { _id: chat._id, user, lastMessage };
        });

        return response;
    }
}
