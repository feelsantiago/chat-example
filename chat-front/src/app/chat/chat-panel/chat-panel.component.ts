import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../chat-types';

@Component({
    selector: 'app-chat-panel',
    templateUrl: './chat-panel.component.html',
    styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent implements OnInit {
    @Input()
    public messages: Message[];

    public ngOnInit(): void {}
}
