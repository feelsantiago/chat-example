import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload, UserInfo } from '../auth-types';

declare interface Request {
    user: UserInfo;
}

export const User = createParamDecorator(
    (data, host: ExecutionContext): JwtPayload => {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        return request.user;
    },
);
