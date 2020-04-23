import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { ChatSocket } from './chat.socket';
import { AuthenticationPayload, ConnectionData, NewMessagePayload, MessagePayload, SelectedUser } from './chat-types';

@Injectable()
export class ChatService {
    /**
     * The connection happens once when the module is loaded, after a manual disconnection
     * the service will not connect again, we need to manually do this
     */
    private isDisconnected: boolean;

    private selectedUser: Subject<SelectedUser>;

    private selectedChat: Subject<string>;

    public get selectedUser$(): Observable<SelectedUser> {
        return this.selectedUser.asObservable();
    }

    public get selectedChat$(): Observable<string> {
        return this.selectedChat.asObservable();
    }

    constructor(private socket: ChatSocket) {
        this.isDisconnected = false;
        this.selectedUser = new Subject();
    }

    public setSelectedUser(user: SelectedUser): void {
        this.selectedUser.next(user);
    }

    public setSelectedChat(_id: string): void {
        this.selectedChat.next(_id);
    }

    public disconnect(): void {
        this.socket.disconnect();
        this.isDisconnected = true;
    }

    public sendMessage(payload: MessagePayload): void {
        this.socket.emit('send_message', payload);
    }

    public getMessage(): Observable<NewMessagePayload> {
        return this.socket.fromEvent<NewMessagePayload>('new_message');
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
