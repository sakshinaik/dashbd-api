import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpHeaders } from '@angular/common/http';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
export const defaultTimeout = 10000;


@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private defaultApplicationHeaders = {
    'Content-Type': 'application/json'
}

  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout) {
      console.log("INTERCEPTING REQUEST")
      let headers = this.defaultApplicationHeaders;

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeout = Number(req.headers.get('timeout')) || this.defaultTimeout;
    const headers = new HttpHeaders(this.defaultApplicationHeaders);
     req = req.clone({ headers });
    return next.handle(req).timeout(timeout);
  }
}