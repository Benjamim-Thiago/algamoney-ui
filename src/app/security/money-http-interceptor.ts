import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class NotAuthenticatedError {

}

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (!req.url.includes('/oauth/token') && this.authService.isAccessTokenInvalid()) {

      return from(this.authService.getNewAccessToken())
          .pipe(
              mergeMap(() => {
                if (this.authService.isAccessTokenInvalid()) {
                  throw new NotAuthenticatedError();
                }
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                return next.handle(req);
              })
          );
      }
    return next.handle(req);
  }
}
