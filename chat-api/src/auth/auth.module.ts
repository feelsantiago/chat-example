import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { SocketAuthGuard } from './guards/socket-auth.guard';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'phormigg@@t0mic@',
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtAuthGuard, SocketAuthGuard],
    exports: [AuthService, JwtAuthGuard, SocketAuthGuard],
})
export class AuthModule {}
