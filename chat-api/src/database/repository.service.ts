import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserModelToken } from './database.providers';
import { UserSchema } from './schemas/user.schema';

@Injectable()
export class RepositoryService {
    constructor(@Inject(UserModelToken) private readonly userModel: Model<UserSchema>) {}

    public get users(): Model<UserSchema> {
        return this.userModel;
    }
}
