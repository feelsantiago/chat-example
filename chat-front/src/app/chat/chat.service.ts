import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { ChatSocket } from './chat.socket';
import { AuthenticationPayload } from './chat-types';

@Injectable()
export class ChatService {
    constructor(private socket: ChatSocket) {}

    public disconnect(): void {
        this.socket.disconnect();
    }

    public sendMessage(msg: string): void {
        this.socket.emit('message', msg);
    }

    public getMessage(): Observable<string> {
        return this.socket.fromEvent<string>('message');
    }

    public authenticate(data: AuthenticationPayload): void {
        this.socket.emit('authentication', data);
    }

    public onAuthenticationSuccessful(_id: string): Observable<boolean> {
        return this.socket.fromEvent<boolean>('authenticated').pipe(switchMap(() => this.createRoomEvent(_id)));
    }

    private createRoomEvent(_id: string): Observable<boolean> {
        const observable$ = new Observable((subscriber: Subscriber<boolean>) => {
            this.socket.emit('create_room', { _id }, (result) => {
                subscriber.next(result);
                subscriber.complete();
            });
        });

        return observable$;
    }
}
