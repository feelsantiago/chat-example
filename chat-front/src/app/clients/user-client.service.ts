import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigService } from '../services/config.service';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { getHeaders, handleRequestError } from '../utils/request-helpers';

@Injectable({ providedIn: 'root' })
export class UserClientService {
    private readonly baseUrl = 'user';

    constructor(
        private readonly http: HttpClient,
        private configService: ConfigService,
        private readonly authService: AuthService,
    ) {}

    public getUserById(_id: string): Observable<UserModel> {
        const { token } = this.authService;
        const headers = getHeaders(token);
        return this.http
            .get<UserModel>(`${this.configService.apiUrl}/${this.baseUrl}/${_id}`, { headers })
            .pipe(catchError(handleRequestError));
    }

    public getConnectedUsers(): Observable<UserModel[]> {
        const { token } = this.authService;
        const headers = getHeaders(token);
        return this.http
            .get<UserModel[]>(`${this.configService.apiUrl}/${this.baseUrl}/online`, { headers })
            .pipe(catchError(handleRequestError));
    }
}
