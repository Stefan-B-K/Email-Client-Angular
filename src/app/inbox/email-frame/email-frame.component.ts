import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { EmailService } from "../email.service";

@Component({
    selector: 'app-email-frame',
    templateUrl: './email-frame.component.html',
    styleUrls: ['./email-frame.component.css']
})
export class EmailFrameComponent implements OnDestroy {
    loading$: BehaviorSubject<boolean>

    constructor (private emailService: EmailService) {
        this.loading$ = emailService.loadingOneIn$
    }

    ngOnDestroy () {
        this.loading$.next(false)
    }

}
