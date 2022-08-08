import { Component, Input, OnInit } from '@angular/core';
import { EmailDetail, EmailNew, EmailService } from "../email.service";
import { AuthService } from "../../auth/auth.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { ModalConfig } from "../../shared/modal/modal";

export type ConfigNewEmail = {
    title: string,
    buttonCaption: string,
    replyTo?: EmailDetail
}

@Component({
    selector: 'app-email-create',
    templateUrl: './email-create.component.html',
    styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
    @Input() newEmailConfig!: ConfigNewEmail
    showModal = false
    modalConfig!: ModalConfig
    email: EmailNew
    from: string
    sub!: Subscription
    loading$: BehaviorSubject<boolean>

    constructor (private authService: AuthService, private emailService: EmailService) {
        this.loading$ = emailService.loadingOneOut$
        this.from = `${authService.username}@angular-email.com`
        this.email = {
            to: '',
            subject: '',
            text: ''
        }
    }

    ngOnInit (): void {
        const { title, replyTo } = this.newEmailConfig
        this.modalConfig = { title, closeButton: false }
        if (replyTo) {
            const { from, subject, text } = replyTo
            this.email.to = from
            this.email.subject = 'Re: ' + subject
            this.email.text = `\n\n------------ Original Message ---------------\n> ${text?.replace(/\n/gi, '\n> ')}`
        }
    }

    sendEmail (email: EmailNew) {
        this.sub = this.emailService.sendEmail(email)
            .subscribe(() => {
                this.loading$.next(false)
                this.showModal = false
            })
    }

    ngOnDestroy () {
        if (this.sub) this.sub.unsubscribe()
    }

}
