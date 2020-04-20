import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
import { handleRequestError } from '../utils/request-helpers';
import { SignInRequest, SignInResponse } from './client-types';

@Injectable({ providedIn: 'root' })
export class AuthClientService {
    private readonly baseUrl = 'auth';

    constructor(private readonly http: HttpClient, private configService: ConfigService) {}

    public signin(body: SignInRequest): Observable<SignInResponse> {
        return this.http
            .post<SignInResponse>(`${this.configService.apiUrl}/${this.baseUrl}/signin`, body)
            .pipe(catchError(handleRequestError));
    }
}
