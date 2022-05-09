import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../service/auth.service";
import { logUtil } from "../utill/logUtill";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isLoggedIn();

    logUtil("AuthGuard = ", isAuthenticated)
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login').then(r => logUtil("r = ", r));
    }
    return true;
  }
}
