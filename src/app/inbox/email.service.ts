import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Endpoints } from "../Endpoints";
import { BehaviorSubject } from "rxjs";

export type Email = {
    id: string,
    subject: string,
    from: string
}

export type EmailDetail = {
    id: string,
    subject: string,
    from: string
    to: string,
    text?: string,
    html?: string
}

export type EmailNew = {
    to: string,
    subject: string,
    text: string
}

type EmailSentResponse = { "status": string }

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    loadingAll$ = new BehaviorSubject<boolean>(false)
    loadingOneIn$ = new BehaviorSubject<boolean>(false)
    loadingOneOut$ = new BehaviorSubject<boolean>(false)

    constructor (private http: HttpClient) { }

    getEmails = () => {
        this.loadingAll$.next(true)
        return this.http.get<Email[]>(Endpoints.emails)
    }

    getEmail = (id: string) => {
        this.loadingOneIn$.next(true)
        return this.http.get<EmailDetail>(Endpoints.emails + '/'+ id)
    }

    sendEmail = (email: EmailNew) => {
        console.log(email)
        this.loadingOneOut$.next(true)
        return this.http.post<EmailSentResponse>(Endpoints.emails, email)
    }

}
