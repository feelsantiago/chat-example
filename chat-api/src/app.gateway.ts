import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateRoomPayload, MessagePayload } from './chat-types';

@WebSocketGateway()
export class AppGateway {
    @WebSocketServer()
    private server: Server;

    @SubscribeMessage('create_room')
    public handleCreateRoom(@MessageBody() data: CreateRoomPayload, @ConnectedSocket() socket: Socket): void {
        socket.join(data._id);
    }

    @SubscribeMessage('send_message')
    public handleSendMessage(@MessageBody() data: MessagePayload): void {
        this.server.to(data.receiver).emit('new_message', data.message);
    }
}
