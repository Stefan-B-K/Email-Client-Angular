import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { Pages } from "./Pages";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    pages = Pages
    signedIn$: BehaviorSubject<boolean | null>

    constructor (private authService: AuthService) {
        this.signedIn$ = authService.signedIn$
    }

    ngOnInit () {
        this.authService.checkSigned().subscribe(() => {})
    }
}
