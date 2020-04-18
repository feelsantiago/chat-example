import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * This guards wraps native JWT guard for custom authetications methods
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
    public handleRequest(err: Error, payload: any, info: any): any {
        if (err || !payload) {
            throw err || new UnauthorizedException();
        }

        return payload;
    }
    /* eslint-enable @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unused-vars */
}
