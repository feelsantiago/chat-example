import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { map, filter, concatMap, mergeMap, scan } from 'rxjs/operators';

import { from } from 'rxjs';
import { GetChatResponse } from '../../clients/client-types';
import { ChatClientService } from '../../clients/chat-client.service';
import { UserModel } from '../../models/user.model';
import { UserClientService } from '../../clients/user-client.service';
import { ChatService } from '../chat.service';
import { UserCard, Message, UserCardChat } from '../chat-types';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-chat-dashboard',
    templateUrl: './chat-dashboard.component.html',
    styleUrls: ['./chat-dashboard.component.scss'],
})
export class ChatDashboardComponent implements OnInit, OnDestroy {
    private readonly subscriptions: SubSink;

    private tempChatIndex: number;

    public users: UserCard[];

    public chats: UserCardChat[];

    public messages: Message[];

    // constructor(private readonly chatService: ChatService) {}
    constructor(
        private readonly authService: AuthService,
        private readonly chatService: ChatService,
        private readonly userClientService: UserClientService,
        private readonly chatClientService: ChatClientService,
        private readonly router: Router,
    ) {
        this.subscriptions = new SubSink();
        this.chats = [];
    }

    public ngOnInit(): void {
        const { _id } = this.authService.user;
        const { token } = this.authService;

        this.subscriptions.sink = this.chatService
            .authenticate({ _id, token })
            .subscribe((result) => console.log(`Create Room Status: ${result}`));

        this.handleConnectedUsers(_id);
        this.handleChats();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onUserConnectedClick(user: UserCardChat): void {
        const find = this.chats.find((chat) => chat._id === user._id);
        if (find) {
            this.chatService.setSelectedChat(user._id);
        } else {
            const tempChat = this.updateTempChat(user);

            if (this.tempChatIndex >= 0) {
                this.chats.splice(this.tempChatIndex, 1);
            }

            this.chats = [...this.chats, tempChat];
            this.tempChatIndex = this.chats.length - 1;
            this.chatService.setSelectedChat(user._id);
        }
    }

    public onLogout(): void {
        this.authService.clearSession();
        this.chatService.disconnect();
        this.router.navigate(['/']);
    }

    private updateTempChat(user: UserCardChat): UserCardChat {
        return { ...user, subtitle: '', isTemp: true };
    }

    private handleConnectedUsers(_id: string): void {
        this.subscriptions.sink = this.userClientService
            .getConnectedUsers()
            .pipe(map((users) => this.mapUsersToCards(users)))
            .subscribe((users) => {
                this.users = users;
            });

        this.subscriptions.sink = this.chatService
            .onUserConnected()
            .pipe(
                /** Ignore our connection */
                filter((data) => data._id !== _id),
                concatMap((data) => this.userClientService.getUserById(data._id)),
                map((user) => this.mapUsersToCards([user]).pop()),
            )
            .subscribe((user) => this.users.push(user));

        this.subscriptions.sink = this.chatService.onUserDisconnected().subscribe((data) => {
            const index = this.users.findIndex((user) => user._id === data._id);
            this.users.splice(index, 1);
        });
    }

    private handleChats(): void {
        this.subscriptions.sink = this.chatClientService
            .getChats()
            .pipe(
                map((chats) => this.mapChatToCards(chats)),
                mergeMap((chats) => from(chats)),
                concatMap((chat) =>
                    this.userClientService.getUserById(chat._id).pipe(map((user) => ({ ...chat, name: user.name }))),
                ),
                scan((acc, next) => [...acc, next], []),
            )
            .subscribe((chats) => {
                this.chats = chats;
            });
    }

    private mapUsersToCards(users: UserModel[]): UserCard[] {
        return users.map((user) => ({ _id: user._id, name: user.name, avatar: '', subtitle: 'Online' }));
    }

    private mapChatToCards(chats: GetChatResponse[]): UserCardChat[] {
        return chats.map((chat) => ({
            _id: chat.user,
            chat: chat._id,
            name: chat.user,
            subtitle: chat.lastMessage,
            avatar: '',
            isTemp: false,
        }));
    }
}
