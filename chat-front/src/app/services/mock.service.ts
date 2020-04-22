import { Injectable } from '@angular/core';
import { UserCard, Message } from '../chat/chat-types';

@Injectable({ providedIn: 'root' })
export class MockService {
    public get chats(): UserCard[] {
        return [
            {
                _id: '',
                name: 'Filipe',
                avatar: '',
                subtitle: 'Last message...',
            },
        ];
    }

    public get messages(): Message[] {
        return [
            {
                text: 'Mesage 1',
                isDonor: false,
            },
            {
                text: 'Message 2',
                isDonor: true,
            },
        ];
    }
}
