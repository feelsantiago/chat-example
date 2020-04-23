import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { GetChatResponse, MessagesResponse } from './client-types';
import { getHeaders } from '../utils/request-helpers';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ChatClientService {
    private readonly baseUrl = 'chat';

    constructor(
        private readonly http: HttpClient,
        private configService: ConfigService,
        private authService: AuthService,
    ) {}

    public getChats(): Observable<GetChatResponse[]> {
        const { token } = this.authService;
        const headers = getHeaders(token);
        return this.http.get<GetChatResponse[]>(`${this.configService.apiUrl}/${this.baseUrl}`, { headers });
    }

    public getMessages(_id: string): Observable<MessagesResponse[]> {
        const { token } = this.authService;
        const headers = getHeaders(token);
        return this.http.get<MessagesResponse[]>(`${this.configService.apiUrl}/${this.baseUrl}/${_id}`, { headers });
    }
}
