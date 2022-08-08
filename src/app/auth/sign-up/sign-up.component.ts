import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { MatchPassword } from "../validators/match-password";
import { UniqueUsername } from "../validators/unique-username";
import { AuthService, SignUpCredentials } from "../auth.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Pages } from "../../Pages";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {
    loading$: BehaviorSubject<boolean>
    sub!: Subscription

    signUpForm = new FormGroup({
        username: new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20),
                Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$/)
            ],
            [this.uniqueUsername.validate]
        ),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20)
        ]),
        passwordConfirmation: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20)
        ])
    }, [this.matchPassword.validate])

    constructor (
        private matchPassword: MatchPassword,
        private uniqueUsername: UniqueUsername,
        private authService: AuthService,
        private router: Router
    ) {
        this.loading$ = authService.loading$
    }

    submitForm () {
        if (this.signUpForm.invalid) return

        this.sub = this.authService.signUp(this.signUpForm.value as SignUpCredentials)
            .subscribe({
                next: () => {
                    this.loading$.next(false)
                    this.router.navigateByUrl(Pages.inbox)
                },
                error: err => {
                    this.loading$.next(false)
                    if (!err.status) {
                        this.signUpForm.setErrors({ noConnection: true })
                    } else {
                        this.signUpForm.setErrors({ serverError: true })
                    }
                }
            })
    }

    ngOnDestroy () {
        if (this.sub) this.sub.unsubscribe()
    }

}
