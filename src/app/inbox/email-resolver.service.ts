import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { EmailDetail, EmailService } from "./email.service";
import { Pages } from "../Pages";
import { catchError, EMPTY } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EmailResolverService implements Resolve<EmailDetail> {

    constructor (private emailService: EmailService, private router: Router) {}

    resolve (route: ActivatedRouteSnapshot) {
        const id = route.params[Pages.email]
        return this.emailService.getEmail(id)
            .pipe(
                catchError(() => {
                    this.router.navigateByUrl(`/${Pages.inbox}/${Pages.emailNotFound}`)
                    return EMPTY
                })
            )
    }
}
