import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailNew } from "../email.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
    @Input() email!: EmailNew
    @Input() from!: string
    @Output() sendEmail = new EventEmitter()

    emailForm = new FormGroup({
        to: new FormControl('', [Validators.required, Validators.email]),
        from: new FormControl({ value: '', disabled: true }),
        subject: new FormControl('', [Validators.required]),
        text: new FormControl('')
    })

    constructor () {}

    ngOnInit (): void {
        const { to, subject, text } = this.email
        this.emailForm.setValue({ to, from: this.from, subject, text })
    }

    submit () {
        if (this.emailForm.invalid) return
        this.sendEmail.emit(this.emailForm.value)
    }

}
