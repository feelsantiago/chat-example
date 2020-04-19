import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';
import { ChatDashboardComponent } from './chat-dashboard/chat-dashboard.component';
import { ChatService } from './chat.service';
import { ChatSocket } from './chat.socket';

@NgModule({
    declarations: [ChatListComponent, ChatMessagesComponent, ChatPanelComponent, ChatDashboardComponent],
    imports: [CommonModule, ChatRoutingModule, SocketIoModule],
    providers: [ChatSocket, ChatService],
})
export class ChatModule {}
