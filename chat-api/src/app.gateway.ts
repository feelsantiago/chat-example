import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Client, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server: Server;

    public handleConnection(client: Socket, ...args: any[]): void {
        console.log('connection');
        console.log(args);
    }

    @SubscribeMessage('message')
    public handleMessage(@MessageBody() data: string): string {
        console.log(data);
        return data;
    }
}
