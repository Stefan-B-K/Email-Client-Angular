import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { MatchPassword } from "../validators/match-password";
import { UniqueUsername } from "../validators/unique-username";
import { AuthService, SignUpInfo } from "../auth.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

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
            Validators.minLength(6),
            Validators.maxLength(20)
        ]),
        passwordConfirmation: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
        ])
    }, [this.matchPassword.validate])

    constructor (
        private matchPassword: MatchPassword,
        private uniqueUsername: UniqueUsername,
        private authService: AuthService
    ) { }

    submitForm () {
        if (this.signUpForm.invalid) return
        this.authService.signUp(this.signUpForm.value as SignUpInfo)
            .subscribe({
                next: response => {
                   // navigate to emails
                },
                error: err => {
                    if (!err.status) {
                        this.signUpForm.setErrors({ noConnection: true })
                    } else {
                        this.signUpForm.setErrors({ serverError: true })
                    }
                }
            })
    }

}
