import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from "./auth.service";
import { Pages } from "../Pages";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {

    constructor (private authService: AuthService, private router: Router) {}

    canLoad (route: Route): Observable<any> {
        return this.authService.signedIn$
            .pipe(
                skipWhile(signedIn => signedIn === null),
                take(1),
                tap((signedIn) => {
                    if (!signedIn) this.router.navigateByUrl(Pages.root)
                })
            )
    }
}
