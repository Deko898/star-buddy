import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('s_b_token');

        if (token) {
            const authReq = req.clone({
                headers: req.headers.set('Bearer', token)
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}