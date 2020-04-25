import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const getUserToken = this.authService.getToken();
    const userRoles = localStorage.getItem("roles");
    const userRolesAr = userRoles.split(",")
    let roleFound: boolean
    userRolesAr.forEach(role => {
      if (route.data.roles.includes(role)) {
        roleFound = true
      }
    });
    if (roleFound && getUserToken) {
      return true;
    } else if (getUserToken) {
      this.router.navigate(['/home'])
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
