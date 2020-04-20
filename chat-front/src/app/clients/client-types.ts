import { UserModel } from '../models/user.model';

export interface SignInRequest {
    readonly email: string;
    readonly password: string;
}

export interface SignInResponse {
    readonly token: string;
    readonly user: UserModel;
}
