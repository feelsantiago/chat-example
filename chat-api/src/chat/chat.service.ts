import { Injectable } from '@nestjs/common';
import { Chat } from '../database/schemas/chat.schema';
import { ChatResponse } from './chat-types';

@Injectable()
export class ChatService {
    public createChatResponse(chats: Chat[], requestId: string): ChatResponse[] {
        if (!chats || chats.length === 0) {
            return [];
        }

        const response = chats.map((chat) => {
            const user = chat.users.filter((_id) => _id !== requestId).pop();
            const lastMessage = chat.messages.pop().text;

            return { user, lastMessage };
        });

        return response;
    }
}
