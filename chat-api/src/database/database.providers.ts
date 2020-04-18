import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const DatabaseConnectionToken = 'DbConnectionToken';
export const UserModelToken = 'UserModel';

export const providers: Provider[] = [
    {
        provide: DatabaseConnectionToken,
        useFactory: async (): Promise<typeof mongoose> => {
            const connection = await mongoose.connect('mongodb://localhost/chat', {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            });

            /* eslint-disable no-console */
            console.log('[Database - Connection successful]');
            /* eslint-enable no-console */
            return connection;
        },
        inject: [],
    },
    {
        provide: UserModelToken,
        useFactory: (connection: Connection) => connection.model<UserSchema>('users', UserSchema),
        inject: [DatabaseConnectionToken],
    },
];
