import { Component, Input, Output, EventEmitter } from '@angular/core';
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

    @Output()
    public cardClick = new EventEmitter();

    public onCardClick(user: UserCard): void {
        this.cardClick.emit(user);
    }
}
