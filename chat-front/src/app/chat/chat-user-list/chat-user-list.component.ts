import { Component, Input } from '@angular/core';
import { UserCard } from '../chat-types';

@Component({
    selector: 'app-chat-user-list',
    templateUrl: './chat-user-list.component.html',
    styleUrls: ['./chat-user-list.component.scss'],
})
export class ChatUserListComponent {
    @Input()
    public title: string;

    @Input()
    public users: UserCard[];
}
