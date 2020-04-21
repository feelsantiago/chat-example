import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';

@Module({
    imports: [DatabaseModule, CommonModule],
    controllers: [UserController],
})
export class UserModule {}
