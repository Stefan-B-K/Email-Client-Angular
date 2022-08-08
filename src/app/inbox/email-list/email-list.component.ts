import { Component, OnInit } from '@angular/core';
import { Email, EmailService } from "../email.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { ConfigNewEmail } from "../email-create/email-create.component";

@Component({
    selector: 'app-email-list',
    templateUrl: './email-list.component.html',
    styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
    sub!: Subscription
    emails: Email[] = []
    loading$: BehaviorSubject<boolean>
    newEmailConfig: ConfigNewEmail =
        {
            title: 'New Email"',
            buttonCaption: 'Compose',
        }

    constructor (private emailService: EmailService) {
        this.loading$ = emailService.loadingAll$
    }

    ngOnInit () {
        this.sub = this.emailService.getEmails()
            .subscribe(emails => {
                this.loading$.next(false)
                this.emails = emails
            })
    }

    ngOnDestroy () {
        if (this.sub) this.sub.unsubscribe()
    }

}
