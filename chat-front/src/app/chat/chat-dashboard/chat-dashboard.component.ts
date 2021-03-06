import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { map, filter, concatMap, mergeMap, scan } from 'rxjs/operators';

import { from } from 'rxjs';
import { GetChatResponse, MessagesResponse } from '../../clients/client-types';
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

    public selectedChat: string;

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
            this.chatService.setSelectedUser({ _id: user._id, name: user.name });
        } else {
            const tempChat = this.updateTempChat(user);
            this.messages = [];

            if (this.tempChatIndex >= 0) {
                this.chats.splice(this.tempChatIndex, 1);
            }

            this.chats = [...this.chats, tempChat];
            this.tempChatIndex = this.chats.length - 1;
            this.selectedChat = 'temp';
            this.chatService.setSelectedChat('temp');
            this.chatService.setSelectedUser({ _id: user._id, name: user.name });
        }
    }

    public onChatClick(card: UserCardChat): void {
        const { user } = this.authService;

        if (!card.isTemp) {
            this.subscriptions.sink = this.chatClientService
                .getMessages(card.chat)
                .pipe(map((messages) => this.mapMessages(messages, card.chat, user._id)))
                .subscribe((messages) => {
                    this.messages = messages;
                    this.selectedChat = card.chat;
                    this.chatService.setSelectedChat(card.chat);
                    this.chatService.setSelectedUser({ _id: card._id, name: card.name });
                });
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

        this.subscriptions.sink = this.chatService.onNewChatCreated().subscribe((chat) => {
            const temp = this.chats[this.chats.length - 1];
            temp.isTemp = false;
            temp.chat = chat._id;
            this.tempChatIndex = undefined;
            this.selectedChat = chat._id;
            this.chatService.setSelectedChat(chat._id);
        });

        this.subscriptions.sink = this.chatService.onNewMessage().subscribe((payload) => {
            const { chat, message, sender } = payload;
            const find = this.findOrCreateChat(chat, sender, message);

            if (find.chat === this.selectedChat) this.messages.push({ chat, message, sender, isDonor: false });
        });
    }

    private findOrCreateChat(_id: string, sender: string, message: string): UserCardChat {
        let chat = this.chats.find((card) => card.chat === _id);

        if (!chat) {
            const { name } = this.users.find((user) => user._id === sender);
            chat = { _id: sender, chat: _id, avatar: '', subtitle: message, name, isTemp: false };
            this.chats.push(chat);
        }

        return chat;
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

    private mapMessages(messages: MessagesResponse[], chat: string, userId: string): Message[] {
        return messages.map((message) => ({
            chat,
            message: message.text,
            sender: message.user,
            isDonor: userId === message.user,
        }));
    }
}
