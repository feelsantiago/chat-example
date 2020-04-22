import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { ChatSocket } from './chat.socket';
import { AuthenticationPayload, ConnectionData } from './chat-types';

@Injectable()
export class ChatService {
    /**
     * The connection happens once when the module is loaded, after a manual disconnection
     * the service will not connect again, we need to manually do this
     */
    private isDisconnected: boolean;

    constructor(private socket: ChatSocket) {
        this.isDisconnected = false;
    }

    public disconnect(): void {
        this.socket.disconnect();
        this.isDisconnected = true;
    }

    public sendMessage(msg: string): void {
        this.socket.emit('message', msg);
    }

    public getMessage(): Observable<string> {
        return this.socket.fromEvent<string>('message');
    }

    public authenticate(data: AuthenticationPayload): Observable<boolean> {
        this.checkConnection();
        this.socket.emit('authentication', data);
        return this.socket.fromEvent<boolean>('authenticated').pipe(switchMap(() => this.createRoom(data._id)));
    }

    public onUserConnected(): Observable<ConnectionData> {
        return this.socket.fromEvent<ConnectionData>('user_connected');
    }

    public onUserDisconnected(): Observable<ConnectionData> {
        return this.socket.fromEvent<ConnectionData>('user_disconnected');
    }

    private createRoom(_id: string): Observable<boolean> {
        const observable$ = new Observable((subscriber: Subscriber<boolean>) => {
            this.socket.emit('create_room', { _id }, (result) => {
                subscriber.next(result);
                subscriber.complete();
            });
        });

        return observable$;
    }

    private checkConnection(): void {
        if (this.isDisconnected) {
            this.socket.connect();
        }
    }
}
