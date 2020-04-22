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

import { CreateRoomPayload, MessagePayload } from './chat-types';
import { RepositoryService } from './database/repository.service';
import { SocketAuthGuard } from './auth/guards/socket-auth.guard';
import { ConnectedUsersService } from './common/services/connected-users.service';

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
    public handleSendMessage(@MessageBody() data: MessagePayload): void {
        this.server.to(data.receiver).emit('new_message', data.message);
    }
}
