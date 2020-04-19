import { Component, OnInit } from '@angular/core';
import { MockService } from '../../services/mock.service';
import { ChatService } from '../chat.service';
import { UserCard } from '../chat-types';

@Component({
    selector: 'app-chat-dashboard',
    templateUrl: './chat-dashboard.component.html',
    styleUrls: ['./chat-dashboard.component.scss'],
})
export class ChatDashboardComponent implements OnInit {
    public users: UserCard[];

    public chats: UserCard[];

    // constructor(private readonly chatService: ChatService) {}
    constructor(private readonly mockService: MockService) {}

    public ngOnInit(): void {
        this.users = this.mockService.users;
        this.chats = this.mockService.chats;
    }
}
