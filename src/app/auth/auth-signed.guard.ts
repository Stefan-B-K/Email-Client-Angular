import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { skipWhile, take } from 'rxjs';
import { AuthService } from "./auth.service";
import { Pages } from "../Pages";

@Injectable({
    providedIn: 'root'
})
export class AuthSignedGuard implements CanActivate {

    constructor (private authService: AuthService, private router: Router) {}

    canActivate (
        route: ActivatedRouteSnapshot): boolean {
        this.authService.signedIn$
            .pipe(
                skipWhile(signedIn => signedIn === null),
                take(1)
            )
            .subscribe(signedIn => {
                if (signedIn) this.router.navigateByUrl('/' + Pages.inbox)
                return false
            })
        return true
    }

}
