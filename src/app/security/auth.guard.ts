import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.authService.isAccessTokenInvalid()) {
        console.log('Navegação com access token inválido. Obtendo novo token...');

        return this.authService.getNewAccessToken()
          .then(() => {
            if (this.authService.isAccessTokenInvalid()) {
              this.router.navigate(['/login']);
              return false;
            }

            return true;
          });
      } else if (next.data.roles && !this.authService.hasAnyPermission(next.data.roles)) {
      this.router.navigate(['/not-authorized']);
      return false;
    }

      return true;
  }
}
