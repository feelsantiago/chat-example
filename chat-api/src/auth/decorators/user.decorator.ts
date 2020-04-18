import { createParamDecorator } from '@nestjs/common';
import { User } from '../../database/schemas/user.schema';

export const UserInfo = createParamDecorator(
    (data, req): User => {
        return req.user;
    },
);
