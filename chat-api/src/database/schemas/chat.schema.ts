import { Schema, Document } from 'mongoose';

export interface Message {
    readonly text: string;
    readonly user: string;
}

export interface Chat {
    readonly users: string[];
    readonly messages: Message[];
}

export interface ChatSchema extends Chat, Document {}

const MessageSchema = new Schema(
    {
        text: { type: String, required: true },
        user: { type: String, required: true },
    },
    { _id: false, timestamps: true },
);

export const ChatSchema = new Schema(
    {
        users: [{ type: String, default: [] }],
        messages: [MessageSchema],
    },
    { timestamps: true },
);
