import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from "./Pages";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    {
        path: Pages.inbox,
        canLoad: [AuthGuard],
        loadChildren: () => import('./inbox/inbox.module')
            .then(m => m.InboxModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
