import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appScrollToBottom]',
})
export class ScrollToBottomDirective {
    constructor(private readonly el: ElementRef) {}

    @HostListener('DOMNodeInserted')
    public onNodeInserted(): void {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    }
}
