import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EmailDetail, EmailService } from "../email.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { ConfigNewEmail } from "../email-create/email-create.component";

@Component({
    selector: 'app-email-show',
    templateUrl: './email-show.component.html',
    styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent {
    sub!: Subscription
    email!: EmailDetail
    loading$: BehaviorSubject<boolean>
    newEmailConfig: ConfigNewEmail =
        {
            title: 'Reply',
            buttonCaption: 'Reply',
        }

    constructor (private route: ActivatedRoute, private emailService: EmailService) {
        this.loading$ = emailService.loadingOneIn$
        this.sub = this.route.data
            .subscribe(({ email }) => {
                this.loading$.next(false)
                this.email = email
                this.newEmailConfig.replyTo = this.email.text !== undefined ? this.email : undefined
            })
    }

    ngOnDestroy () {
        if (this.sub) this.sub.unsubscribe()
    }

}
