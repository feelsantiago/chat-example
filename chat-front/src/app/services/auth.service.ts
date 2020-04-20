import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _user: UserModel;

    private _token: string;

    private readonly user_key: string = 'user-key';

    private readonly token_key: string = 'token-key';

    public get isLogged(): boolean {
        if (this._token) return true;

        const token = localStorage.getItem(this.token_key);

        if (token) {
            this._token = token;

            return true;
        }

        return false;
    }

    public get user(): UserModel | undefined {
        if (this._user) return this._user;

        const user = JSON.parse(localStorage.getItem(this.user_key));
        this._user = user;

        return user;
    }

    public get token(): string | undefined {
        return this.isLogged ? this.token : undefined;
    }

    public setUserAndToken(user: UserModel, token: string): void {
        this._user = user;
        this._token = token;

        localStorage.setItem(this.user_key, JSON.stringify(user));
        localStorage.setItem(this.token_key, token);
    }

    public clearSession(): void {
        this._token = undefined;
        this._user = undefined;

        localStorage.clear();
    }
}
