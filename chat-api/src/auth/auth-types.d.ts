import { Socket } from 'socket.io';

export interface JwtPayload {
    _id: string;
    name: string;
    email: string;
}

export interface SingInResult {
    user: JwtPayload;
    token: string;
}

export interface SocketAuthenticationPayload {
    readonly _id: string;
    readonly token: string;
}

export type SocketAuthenticationGuard = (
    socket: Socket,
    data: SocketAuthenticationPayload,
    callback: (error: Error, result?: boolean) => void,
) => Promise<void>;
