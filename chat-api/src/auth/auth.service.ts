import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../database/repository.service';
import { JwtPayload } from './auth-types';
import { User } from '../database/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(private readonly repositoryService: RepositoryService, private readonly jwtService: JwtService) {}

    public signIn(payload: JwtPayload): string {
        return this.jwtService.sign(payload);
    }

    public async validate(payload: JwtPayload): Promise<User> {
        const user = await this.repositoryService.users.findById(payload._id);
        return user ? user.toJSON() : null;
    }
}
