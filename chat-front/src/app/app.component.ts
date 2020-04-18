import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private readonly chatService: ChatService) {}

    public ngOnInit(): void {
        console.log('send message');
        this.chatService.sendMessage('mensagem do client');
    }
}
