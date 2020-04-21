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
import { Server, Socket } from 'socket.io';
import * as socketAuth from 'socketio-auth';

import { CreateRoomPayload, MessagePayload } from './chat-types';
import { RepositoryService } from './database/repository.service';
import { SocketAuthGuard } from './auth/guards/socket-auth.guard';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    constructor(
        private readonly repositoryService: RepositoryService,
        private readonly socketAuthGuard: SocketAuthGuard,
    ) {}

    public handleDisconnect(client: any): void {
        console.log('disconect');
    }

    public handleConnection(client: any, ...args: any[]): void {
        console.log('connected');
    }

    public afterInit(server: Server): void {
        socketAuth(server, { authenticate: this.socketAuthGuard.authenticate() });
    }

    @SubscribeMessage('create_room')
    public handleCreateRoom(@MessageBody() data: CreateRoomPayload, @ConnectedSocket() socket: Socket): void {
        socket.join(data._id);
    }

    @SubscribeMessage('send_message')
    public handleSendMessage(@MessageBody() data: MessagePayload): void {
        this.server.to(data.receiver).emit('new_message', data.message);
    }
}
