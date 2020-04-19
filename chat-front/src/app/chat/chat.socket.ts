import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatSocket extends Socket {
    constructor() {
        super({ url: 'http://localhost:3000', options: {} });
    }
}
