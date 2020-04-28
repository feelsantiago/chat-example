import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { AuthService } from '../../services/auth.service';
import { Message, SelectedUser } from '../chat-types';
import { ChatService } from '../chat.service';

@Component({
    selector: 'app-chat-panel',
    templateUrl: './chat-panel.component.html',
    styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent implements OnInit, OnDestroy {
    private readonly subscriptions: SubSink;

    private selectedChat: string;

    private user: string;

    @Input()
    public messages: Message[];

    public selectedUser: SelectedUser;

    public newMessage = '';

    constructor(private readonly chatService: ChatService, private readonly authService: AuthService) {
        this.subscriptions = new SubSink();
    }

    public ngOnInit(): void {
        const { user } = this.authService;
        this.user = user._id;

        this.subscriptions.sink = this.chatService.selectedChat$.subscribe((chat) => {
            this.selectedChat = chat;
        });

        this.subscriptions.sink = this.chatService.selectedUser$.subscribe((selectedUser) => {
            this.selectedUser = selectedUser;
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onSendMessage(): void {
        this.chatService.sendMessage({
            chat: this.selectedChat,
            message: this.newMessage,
            receiver: this.selectedUser._id,
            sender: this.user,
        });

        this.messages.push({
            chat: this.selectedChat,
            message: this.newMessage,
            sender: this.user,
            isDonor: true,
        });

        this.newMessage = '';
    }
}
