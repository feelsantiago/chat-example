import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../database/schemas/user.schema';
import { ConnectedUsersService } from '../common/services/connected-users.service';
import { RepositoryService } from '../database/repository.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly repositoryService: RepositoryService,
        private readonly connectedUsersService: ConnectedUsersService,
    ) {}

    @Get('online')
    public async getConnectedUsers(): Promise<User[]> {
        const _ids = this.connectedUsersService.getConnectedUsers();
        return this.repositoryService.users.find({ _id: { $in: _ids } });
    }

    @Get(':_id')
    public async getUser(@Param('_id') _id: string): Promise<User> {
        return this.repositoryService.users.findById(_id);
    }
}
