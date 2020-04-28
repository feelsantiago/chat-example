import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket, Client } from 'socket.io';
import * as socketAuth from 'socketio-auth';

import { CreateRoomPayload, MessagePayload, NewMessagePayload } from './chat-types';
import { RepositoryService } from './database/repository.service';
import { SocketAuthGuard } from './auth/guards/socket-auth.guard';
import { ConnectedUsersService } from './common/services/connected-users.service';
import { Chat, Message, ChatSchema } from './database/schemas/chat.schema';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    constructor(
        private readonly repositoryService: RepositoryService,
        private readonly socketAuthGuard: SocketAuthGuard,
        private readonly connectedUsersService: ConnectedUsersService,
    ) {}

    public handleConnection(client: Client): void {
        const { id } = client;
        console.log(`New Socket Connection With Id: ${id}`);
        this.connectedUsersService.createConnection(id);
    }

    public handleDisconnect(client: Client): void {
        const { id } = client;
        const _id = this.connectedUsersService.getUser(id);
        console.log(`Client Disconnection With Id: ${id}`);
        this.server.emit('user_disconnected', { _id });
        this.connectedUsersService.closeConnection(id);
    }

    public afterInit(server: Server): void {
        socketAuth(server, { authenticate: this.socketAuthGuard.authenticate() });
    }

    @SubscribeMessage('create_room')
    public handleCreateRoom(@MessageBody() data: CreateRoomPayload, @ConnectedSocket() socket: Socket): boolean {
        socket.join(data._id);
        this.connectedUsersService.addUser(socket.client.id, data._id);
        this.server.emit('user_connected', { _id: data._id });
        return true;
    }

    @SubscribeMessage('send_message')
    public async handleSendMessage(@MessageBody() data: MessagePayload): Promise<void> {
        const chat = await this.createOrUpdateChat(data);
        const { _id } = chat;
        const { message, sender } = data;
        const response: NewMessagePayload = { chat: _id, message, sender };
        this.server.to(data.receiver).emit('new_message', response);
        console.log(data);
        if (data.chat === 'temp') this.server.to(data.sender).emit('new_chat_created', { _id });
    }

    private async createOrUpdateChat(data: MessagePayload): Promise<ChatSchema> {
        return data.chat === 'temp' ? this.createNewChat(data) : this.updateChat(data);
    }

    private async createNewChat(data: MessagePayload): Promise<ChatSchema> {
        const chat: Chat = {
            users: [data.sender, data.receiver],
            messages: [
                {
                    text: data.message,
                    user: data.sender,
                },
            ],
        };

        return this.repositoryService.chats.create(chat);
    }

    private async updateChat(data: MessagePayload): Promise<ChatSchema> {
        const message: Message = {
            text: data.message,
            user: data.sender,
        };

        return this.repositoryService.chats.findByIdAndUpdate(
            data.chat,
            { $push: { messages: message } },
            { new: true },
        );
    }
}
