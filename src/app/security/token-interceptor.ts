import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from "../service/auth.service";
import { logUtil } from "../utill/logUtill";
import { LoginResponse } from "../utill/interfaceUtill";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      return next.handle(req);
    }
    const jwtToken = this.authService.getJwtToken();

    if (jwtToken) {
      logUtil("intercept jwtToken", jwtToken.substring(0, 5))
      return next.handle(this.addToken(req, jwtToken))
        .pipe(
          catchError(error => {
              logUtil("intercept pipe", error)
              if (error instanceof HttpErrorResponse && error.status === 403) {
                return this.handleAuthErrors(req, next);
              } else {
                throw new Error(error.error)
              }
            }
          ));
    }
    return next.handle(req);
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    let httpRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
    });
    logUtil("addToken+ ", httpRequest.headers.get('Authorization')?.substring(0, 5))
    return httpRequest;
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    logUtil("handleAuthErrors")
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          logUtil("refreshTokenResponse!pipe+2+ ", refreshTokenResponse)
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
        })
      )


    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => {
            return next.handle(this.addToken(req, this.authService.getJwtToken()))
          }
        )
      );
    }
  }

}
