import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private socket: Socket) {}

    public sendMessage(msg: string): void {
        this.socket.emit('message', msg);
    }

    public getMessage(): Observable<string> {
        return this.socket.fromEvent<string>('message');
    }
}
