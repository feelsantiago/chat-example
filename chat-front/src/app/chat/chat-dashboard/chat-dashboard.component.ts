import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { map } from 'rxjs/operators';

import { UserModel } from '../../models/user.model';
import { UserClientService } from '../../clients/user-client.service';
import { MockService } from '../../services/mock.service';
import { ChatService } from '../chat.service';
import { UserCard, Message } from '../chat-types';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-chat-dashboard',
    templateUrl: './chat-dashboard.component.html',
    styleUrls: ['./chat-dashboard.component.scss'],
})
export class ChatDashboardComponent implements OnInit, OnDestroy {
    private readonly subscriptions: SubSink;

    public users: UserCard[];

    public chats: UserCard[];

    public messages: Message[];

    // constructor(private readonly chatService: ChatService) {}
    constructor(
        private readonly mockService: MockService,
        private readonly authService: AuthService,
        private readonly chatService: ChatService,
        private readonly userClientService: UserClientService,
        private readonly router: Router,
    ) {
        this.subscriptions = new SubSink();
    }

    public ngOnInit(): void {
        const { _id } = this.authService.user;
        const { token } = this.authService;

        this.chatService.authenticate({ _id, token });
        this.subscriptions.sink = this.chatService
            .onAuthenticationSuccessful(_id)
            .subscribe((result) => console.log(`Create Room Status: ${result}`));

        this.subscriptions.sink = this.userClientService
            .getConnectedUsers()
            .pipe(map((users) => this.mapUsersToCards(users)))
            .subscribe((users) => {
                this.users = users;
            });

        this.chats = this.mockService.chats;
        this.messages = this.mockService.messages;
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onLogout(): void {
        this.authService.clearSession();
        this.chatService.disconnect();
        this.router.navigate(['/']);
    }

    private mapUsersToCards(users: UserModel[]): UserCard[] {
        return users.map((user) => ({ name: user.name, avatar: '', subtitle: 'Online' }));
    }
}
