export interface UserCard {
    readonly _id: string;
    readonly name: string;
    readonly avatar: string;
    readonly subtitle: string;
}

export type UserCardChat = UserCard & { chat: string; isTemp: boolean };

export interface MessagePayload {
    readonly sender: string;
    readonly receiver: string;
    readonly chat: string;
    readonly message: string;
}

export interface NewMessagePayload {
    readonly chat: string;
    readonly message: string;
    readonly sender: string;
}

export type Message = NewMessagePayload & { isDonor: boolean };

export interface AuthenticationPayload {
    readonly _id: string;
    readonly token: string;
}

export interface ConnectionData {
    _id: string;
}

export interface SelectedUser {
    _id: string;
    name: string;
}
