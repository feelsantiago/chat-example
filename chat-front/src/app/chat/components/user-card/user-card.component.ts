import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
})
export class UserOnlineComponent {
    @Input()
    public name: string;

    @Input()
    public avatar: string;

    @Input()
    public subtitle: string;
}
