import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { EmailCreateComponent } from './email-create/email-create.component';
import { EmailListComponent } from './email-list/email-list.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { HttpClientModule } from "@angular/common/http";
import { EmailFrameComponent } from './email-frame/email-frame.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from "../shared/shared.module";
import { EmailFormComponent } from './email-form/email-form.component';


@NgModule({
    declarations: [
        HomeComponent,
        EmailCreateComponent,
        EmailListComponent,
        EmailShowComponent,
        EmailFrameComponent,
        NotFoundComponent,
        EmailFormComponent
    ],
    imports: [
        CommonModule,
        InboxRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule
    ]
})
export class InboxModule {}
