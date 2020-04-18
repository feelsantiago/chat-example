import { IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    public readonly email: string;

    @IsString()
    public readonly password: string;
}
