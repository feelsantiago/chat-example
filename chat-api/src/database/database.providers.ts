import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { ChatSchema } from './schemas/chat.schema';

export const DatabaseConnectionToken = 'DbConnectionToken';
export const UserModelToken = 'UserModel';
export const ChatModelToken = 'ChatModel';
export const MockUserToken = 'MockUserToken';

export const providers: Provider[] = [
    {
        provide: DatabaseConnectionToken,
        useFactory: async (): Promise<typeof mongoose> => {
            const connection = await mongoose.connect('mongodb://localhost/chat', {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            });

            return connection;
        },
        inject: [],
    },
    {
        provide: UserModelToken,
        useFactory: (connection: Connection) => connection.model<UserSchema>('users', UserSchema),
        inject: [DatabaseConnectionToken],
    },
    {
        provide: ChatModelToken,
        useFactory: (connection: Connection) => connection.model<ChatSchema>('chats', ChatSchema),
        inject: [DatabaseConnectionToken],
    },
    // {
    //     provide: MockUserToken,
    //     useFactory: async (users: mongoose.Model<UserSchema>) => {
    //         const admin: User = { name: 'admin', email: 'admin@test.com', password: '123' };
    //         const user1: User = { name: 'user 1', email: 'user1@test.com', password: '123' };
    //         const user2: User = { name: 'user 2', email: 'user2@test.com', password: '123' };
    //         const user3: User = { name: 'user 3', email: 'user3@test.com', password: '123' };

    //         await users.create(admin, user1, user2, user3);
    //     },
    //     inject: [UserModelToken],
    // },
];
