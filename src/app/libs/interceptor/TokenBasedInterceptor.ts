import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RefreshTokenResponse } from '../models/refresh-token-response';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        sessionStorage.getItem('token') ?? ``
      ),
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(this.authService.isLoggedIn())
        if (error.status == 403 && this.authService.isLoggedIn()) {
          return this.refreshTokenMethod(req, next);
        }

        // this.toastrService.handleError(error.error as CustomErrorResponse);
        return throwError('');
      })
    );
  }

  refreshTokenMethod(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authService.refreshToken()).pipe(
      switchMap((res: RefreshTokenResponse) => {
        if (sessionStorage.getItem('token')) {
          sessionStorage.removeItem('token');
        }
        sessionStorage.setItem('token', res.renewedAccessToken);

        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            sessionStorage.getItem('token') ?? ``
          ),
        });

        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status == 403) {
              this.authService.logout();
              // this.toastrService.handleInformative('Session expired');
            }

            // this.toastrService.handleError(error.error as CustomErrorResponse);
            return throwError('');
          })
        );
      })
    );
  }
}
