import { createParamDecorator } from '@nestjs/common';
import { JwtPayload } from '../auth-types';

export const User = createParamDecorator(
    (data, req): JwtPayload => {
        return req.user;
    },
);
