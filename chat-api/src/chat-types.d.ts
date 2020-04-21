import { Socket } from 'socket.io';

export interface CreateRoomPayload {
    readonly _id: string;
}

export interface MessagePayload {
    readonly _id: string;
    readonly message: string;
    readonly receiver: string;
}
