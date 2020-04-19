import { Injectable } from '@angular/core';
import { UserCard } from '../chat/chat-types';

@Injectable({ providedIn: 'root' })
export class MockService {
    public get users(): UserCard[] {
        return [
            {
                name: 'Filipe',
                avatar: '',
                subtitle: 'Online',
            },
            {
                name: 'Thiago',
                avatar: '',
                subtitle: 'Online',
            },
        ];
    }

    public get chats(): UserCard[] {
        return [
            {
                name: 'Filipe',
                avatar: '',
                subtitle: 'Last message...',
            },
        ];
    }
}
