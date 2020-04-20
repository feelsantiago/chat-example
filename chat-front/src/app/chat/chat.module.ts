import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';
import { ChatDashboardComponent } from './chat-dashboard/chat-dashboard.component';
import { ChatService } from './chat.service';
import { ChatSocket } from './chat.socket';
import { UserOnlineComponent } from './components/user-card/user-card.component';
import { MessageComponent } from './components/message/message.component';
import { ScrollToBottomDirective } from './directives/scroll-to-bottom.directive';

@NgModule({
    declarations: [
        ChatUserListComponent,
        ChatPanelComponent,
        ChatDashboardComponent,
        UserOnlineComponent,
        MessageComponent,
        ScrollToBottomDirective,
    ],
    imports: [CommonModule, ChatRoutingModule, SocketIoModule, FormsModule],
    providers: [ChatSocket, ChatService],
})
export class ChatModule {}
