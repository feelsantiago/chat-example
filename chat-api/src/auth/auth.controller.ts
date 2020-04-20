import { Controller, HttpCode, Body, Post, BadRequestException } from '@nestjs/common';
import { RepositoryService } from '../database/repository.service';
import { JwtPayload, SingInResult } from './auth-types';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly repositoryService: RepositoryService, private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(200)
    public async userSignIn(@Body() info: UserLoginDto): Promise<SingInResult> {
        const user = await this.repositoryService.users.findOne({ email: info.email }).select('+password');

        if (!user) {
            throw new BadRequestException('Invalid e-mail or password.');
        }

        const result = await user.verifyPassword(info.password, user.password);

        if (!result) {
            throw new BadRequestException('Invalid e-mail or password.');
        }

        const payload: JwtPayload = { _id: user._id, email: user.email, name: user.name };
        const token = this.authService.signIn(payload);

        return { user: payload, token };
    }
}
