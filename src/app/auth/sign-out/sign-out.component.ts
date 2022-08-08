import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

import { Pages } from "../../Pages";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
    selector: 'app-sign-out',
    templateUrl: './sign-out.component.html',
    styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit, OnDestroy {
    sub!: Subscription
    loading$: BehaviorSubject<boolean>

    constructor (private authService: AuthService, private router: Router) {
        this.loading$ = authService.loading$
    }

    ngOnInit (): void {
        this.sub = this.authService.signOut().subscribe(() => {
            this.loading$.next(false)
            this.router.navigate([Pages.root])
        })
    }

    ngOnDestroy () {
        if (this.sub) this.sub.unsubscribe()
    }
}
