export interface CreateRoomPayload {
    readonly _id: string;
}

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
