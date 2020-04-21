import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockService } from '../../services/mock.service';
import { ChatService } from '../chat.service';
import { UserCard, Message } from '../chat-types';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-chat-dashboard',
    templateUrl: './chat-dashboard.component.html',
    styleUrls: ['./chat-dashboard.component.scss'],
})
export class ChatDashboardComponent implements OnInit {
    public users: UserCard[];

    public chats: UserCard[];

    public messages: Message[];

    // constructor(private readonly chatService: ChatService) {}
    constructor(
        private readonly mockService: MockService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly chatService: ChatService,
    ) {}

    public ngOnInit(): void {
        this.users = this.mockService.users;
        this.chats = this.mockService.chats;
        this.messages = this.mockService.messages;
    }

    public onLogout(): void {
        this.authService.clearSession();
        this.router.navigate(['/']);
    }
}
