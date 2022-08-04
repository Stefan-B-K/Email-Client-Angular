import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpCookieInterceptor implements HttpInterceptor {

    intercept (
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({ withCredentials: true })
        return next.handle(modifiedReq)
            // .pipe(
            //     tap(value => {
            //         if (value.type === HttpEventType.Sent) {}
            //         if (value.type === HttpEventType.Response) {}
            //     }
            // )
    }

}
