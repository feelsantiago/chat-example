import { Module } from '@nestjs/common';
import { ConnectedUsersService } from './services/connected-users.service';

@Module({
    providers: [ConnectedUsersService],
    exports: [ConnectedUsersService],
})
export class CommonModule {}
