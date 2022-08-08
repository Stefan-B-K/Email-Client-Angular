import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

import { Endpoints } from "../Endpoints";


type UsernameResponse = { available: boolean }
export type SignUpCredentials = {
    username: string,
    password: string,
    passwordConfirmation: string
}
export type SignInCredentials = {
    username: string,
    password: string
}
type SignInResponse = { username: string }
type SignedInResponse = {
    authenticated: boolean,
    username: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    signedIn$ = new BehaviorSubject<boolean | null>(null)
    loading$ = new BehaviorSubject<boolean>(false)
    username =  ''

    constructor (private http: HttpClient) {}

    usernameInUse (username: string) {
        return this.http.post<UsernameResponse>(Endpoints.checkUsername, { username })
    }

    signUp (user: SignUpCredentials) {
        this.loading$.next(true)
        return this.http.post<SignInResponse>(Endpoints.signup, user)
            .pipe(
                tap((response) => {
                    this.signedIn$.next(true)
                    this.username = response.username
                })
            )
    }

    signIn (user: SignInCredentials) {
        this.loading$.next(true)
        return this.http.post<SignInResponse>(Endpoints.signin, user)
            .pipe(
                tap((response) => {
                    this.signedIn$.next(true)
                    this.username = response.username
                })
            )
    }

    signOut() {
        this.loading$.next(true)
        return this.http.post(Endpoints.signout, {})
            .pipe(
                tap(() => {
                    this.signedIn$.next(false)
                    this.username = ''
                })
            )
    }

    checkSigned() {
        return this.http.get<SignedInResponse>(Endpoints.checkSigned)
            .pipe(
                tap(({ authenticated, username }) => {
                    this.signedIn$.next(authenticated)
                    this.username = username
                })
            )
    }

}
