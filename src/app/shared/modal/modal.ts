import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

export type ModalConfig =  {
    title: string,
    closeButton: boolean,
    buttonCaption?: string
}

@Component({
    selector: 'app-modal',
    templateUrl: './modal.html',
    styleUrls: ['./modal.css']
})
export class Modal implements OnInit, OnDestroy {
    @Input() config!: ModalConfig
    @Output() dismiss = new EventEmitter()

    constructor (private el: ElementRef) { }

    ngOnInit (): void {
        document.body.appendChild(this.el.nativeElement)
    }

    ngOnDestroy (): void {
        this.el.nativeElement.remove()
    }

    hideModal () { this.dismiss.emit() }

}
