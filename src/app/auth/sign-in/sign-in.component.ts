import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, SignInCredentials } from "../auth.service";
import { Router } from "@angular/router";

import { Pages } from "../../Pages";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnDestroy {
    loading$: BehaviorSubject<boolean>
    sub!: Subscription

    signInForm = new FormGroup({
        username: new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20),
                Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$/)
            ]
        ),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20)
        ])
    })

    constructor (private authService: AuthService, private router: Router) {
        this.loading$ = authService.loading$
    }

    signIn () {
        if (this.signInForm.invalid) return

        this.sub = this.authService.signIn(this.signInForm.value as SignInCredentials)
            .subscribe({
                next: () => {
                    this.loading$.next(false)
                    this.router.navigateByUrl(Pages.inbox)
                },
                error: err => {
                    this.loading$.next(false)
                    if (!err.status) {
                        this.signInForm.setErrors({ noConnection: true })
                    } else if (err.error.username || err.error.password) {
                        this.signInForm.setErrors({ invalidCredentials: true })
                    } else {
                        this.signInForm.setErrors({ serverError: true })
                    }
                }
            })
    }

    ngOnDestroy () {
        if (this.sub) this.sub.unsubscribe()
    }

}
