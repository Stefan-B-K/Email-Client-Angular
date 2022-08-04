import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

type UsernameInUseResponse = { available: boolean }
export type SignUpInfo = {
    username: string,
    password: string,
    passwordConfirmation: string
}
type SIgnUpResponse = { username: string }
type SignedInResponse = {
    authenticated: boolean,
    username: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private rootUrl = 'https://api.angular-email.com/auth/'
    private signupUrl = this.rootUrl + 'signup'
    private signinUrl = this.rootUrl + 'signin'
    private signoutUrl = this.rootUrl + 'signout'
    private checkUsernameUrl = this.rootUrl + 'username'
    private checkSignedUrl = this.rootUrl + 'signedin'

    signedIn$ = new BehaviorSubject(false)

    constructor (private http: HttpClient) {}

    usernameInUse (username: string) {
        return this.http.post<UsernameInUseResponse>(this.checkUsernameUrl, { username })
    }

    signUp (user: SignUpInfo) {
        return this.http.post<SIgnUpResponse>(this.signupUrl, user)
            .pipe(
                tap(() => this.signedIn$.next(true))
            )
    }

    checkSigned() {
        return this.http.get<SignedInResponse>(this.checkSignedUrl,)
            .pipe(
                tap(({ authenticated }) => this.signedIn$.next(authenticated))
            )
    }

}
