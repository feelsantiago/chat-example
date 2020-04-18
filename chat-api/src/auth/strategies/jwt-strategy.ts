import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { JwtPayload } from '../auth-types';
import { User } from '../../database/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'ch$$t777s3cr5ts',
        });
    }

    public async validate(payload: JwtPayload): Promise<User> {
        const user = await this.authService.validate(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
