import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpCookieInterceptor } from "./auth/http-cookie-interceptor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { InboxModule } from './inbox/inbox.module';
import { SharedModule } from "./shared/shared.module";


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        HttpClientModule,
        InboxModule,
        SharedModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpCookieInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
