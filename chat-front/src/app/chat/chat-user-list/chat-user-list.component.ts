import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { UserCard } from '../chat-types';
import { ChatService } from '../chat.service';

@Component({
    selector: 'app-chat-user-list',
    templateUrl: './chat-user-list.component.html',
    styleUrls: ['./chat-user-list.component.scss'],
})
export class ChatUserListComponent implements OnInit, OnDestroy {
    private subscriptions: SubSink;

    @Input()
    public title: string;

    @Input()
    public users: UserCard[];

    @Output()
    public cardClick = new EventEmitter();

    public selectedIdCard: string;

    constructor(private readonly chatService: ChatService) {
        this.subscriptions = new SubSink();
    }

    public ngOnInit(): void {
        this.chatService.selectedUser$.subscribe((user) => {
            this.selectedIdCard = user._id;
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onCardClick(user: UserCard): void {
        this.cardClick.emit(user);
    }
}
