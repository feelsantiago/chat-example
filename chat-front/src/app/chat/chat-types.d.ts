export interface UserCard {
    readonly name: string;
    readonly avatar: string;
    readonly subtitle: string;
}

export interface Message {
    readonly text: string;
    readonly isDonor: boolean;
}
