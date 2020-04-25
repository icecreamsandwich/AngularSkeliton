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
    if (userRolesAr.includes("ROLE_ADMIN") && getUserToken) {
      return true;
    } else if (userRolesAr.includes("ROLE_USER") && route.data.roles.includes("ROLE_USER") && getUserToken) {
      this.router.navigate(['/home'])
      return true;
    } else if (userRolesAr.includes("ROLE_USER") && getUserToken){
      this.router.navigate(['/home'])
      return true;
    }
    else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
