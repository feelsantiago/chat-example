export interface UserCard {
    readonly _id: string;
    readonly name: string;
    readonly avatar: string;
    readonly subtitle: string;
}

export type UserCardChat = UserCard & { isTemp: boolean };

export interface Message {
    readonly text: string;
    readonly isDonor: boolean;
}

export interface AuthenticationPayload {
    readonly _id: string;
    readonly token: string;
}

export interface ConnectionData {
    _id: string;
}
