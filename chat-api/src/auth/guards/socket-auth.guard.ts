import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { RepositoryService } from '../../database/repository.service';
import { AuthService } from '../auth.service';
import { SocketAuthenticationPayload, SocketAuthenticationGuard } from '../auth-types';

@Injectable()
export class SocketAuthGuard {
    constructor(private readonly authService: AuthService, private readonly repositoryService: RepositoryService) {}

    public authenticate(): SocketAuthenticationGuard {
        const authentication = async (
            socket: Socket,
            data: SocketAuthenticationPayload,
            callback: (error: Error, result?: boolean) => void,
        ): Promise<void> => {
            const user = await this.repositoryService.users.findById(data._id);
            if (!user) {
                return callback(new Error('User not found!'));
            }

            const payload = this.authService.verifyToken(data.token);
            if (!payload) {
                return callback(new Error('Invalid Token!'));
            }

            return callback(null, true);
        };

        return authentication;
    }
}
