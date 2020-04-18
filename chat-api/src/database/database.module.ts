import { Module } from '@nestjs/common';
import { providers } from './database.providers';
import { RepositoryService } from './repository.service';

@Module({
    providers: [...providers, RepositoryService],
    exports: [RepositoryService],
})
export class DatabaseModule {}
