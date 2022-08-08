import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { Pages } from "../Pages";
import { EmailFrameComponent } from "./email-frame/email-frame.component";
import { EmailShowComponent } from "./email-show/email-show.component";
import { EmailResolverService } from "./email-resolver.service";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: Pages.emailNotFound, component: NotFoundComponent },
            {
                path: ':' + Pages.email,
                component: EmailShowComponent,
                resolve: { email: EmailResolverService }
            },
            { path: '', component: EmailFrameComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InboxRoutingModule {}
