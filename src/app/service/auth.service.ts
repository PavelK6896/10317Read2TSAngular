import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LoginRequestPayload, LoginResponse, SignupRequestPayload } from "../utill/interface1";
import { url1 } from "../utill/url1";
import { logUtil } from "../utill/log1";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedInEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() usernameEmitter: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient) {
  }

  signUp(signUpRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient
      .post(url1.signUp, signUpRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(url1.login, loginRequestPayload)
      .pipe(map(data => {
        localStorage.setItem('authenticationToken', data.authenticationToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('expiresAt', data.expiresAt.toString());
        this.loggedInEmitter.emit(true);
        this.usernameEmitter.emit(data.username);
        return true;
      }));
  }


  refreshToken(): Observable<any> {
    return this.httpClient.post<LoginResponse>(url1.refreshToken, this.refreshTokenPayload)
      .pipe(tap(response => {
          logUtil("refreshToken!pipe+1+ ", response)
          localStorage.removeItem('authenticationToken');
          localStorage.removeItem('expiresAt');
          localStorage.setItem('authenticationToken', response.authenticationToken);
          localStorage.setItem('expiresAt', response.expiresAt.toString());
        }
      ));
  }

  logout() {
    this.httpClient.post(url1.logout, this.refreshTokenPayload, {responseType: 'text'})
      .subscribe(data => {
        logUtil("logout+ ", data)
      }, error => {
        logUtil("logout- ", error)
        throwError(error);
      })
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
  }

  getUserName() {
    return localStorage.getItem('username');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
