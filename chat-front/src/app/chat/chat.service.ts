import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatSocket } from './chat.socket';

@Injectable()
export class ChatService {
    constructor(private socket: ChatSocket) {}

    public sendMessage(msg: string): void {
        this.socket.emit('message', msg);
    }

    public getMessage(): Observable<string> {
        return this.socket.fromEvent<string>('message');
    }
}
