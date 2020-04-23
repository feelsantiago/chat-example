import { UserModel } from '../models/user.model';

export interface SignInRequest {
    readonly email: string;
    readonly password: string;
}

export interface SignInResponse {
    readonly token: string;
    readonly user: UserModel;
}

export interface GetChatResponse {
    readonly _id: string;
    readonly user: string;
    readonly lastMessage: string;
}

export interface MessagesResponse {
    readonly text: string;
    readonly user: string;
}
