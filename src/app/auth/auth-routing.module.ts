import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { Pages } from "../Pages";
import { SignOutComponent } from "./sign-out/sign-out.component";
import { AuthSignedGuard } from "./auth-signed.guard";

const routes: Routes = [
    { path: Pages.root, redirectTo: Pages.signIn, pathMatch: 'full' },
    { path: Pages.signIn, canActivate: [AuthSignedGuard], component: SignInComponent },
    { path: Pages.signUp, canActivate: [AuthSignedGuard], component: SignUpComponent },
    { path: Pages.signOut, component: SignOutComponent },
    { path: '**', redirectTo: Pages.inbox }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
