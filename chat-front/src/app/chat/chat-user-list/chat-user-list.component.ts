import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserCard } from '../chat-types';
import { ChatService } from '../chat.service';

@Component({
    selector: 'app-chat-user-list',
    templateUrl: './chat-user-list.component.html',
    styleUrls: ['./chat-user-list.component.scss'],
})
export class ChatUserListComponent implements OnInit {
    @Input()
    public title: string;

    @Input()
    public users: UserCard[];

    @Output()
    public cardClick = new EventEmitter();

    public selectedIdCard: string;

    constructor(private readonly chatService: ChatService) {}

    public ngOnInit(): void {
        this.chatService.selectedChat$.subscribe((_id) => {
            this.selectedIdCard = _id;
        });
    }

    public onCardClick(user: UserCard): void {
        this.cardClick.emit(user);
    }
}
