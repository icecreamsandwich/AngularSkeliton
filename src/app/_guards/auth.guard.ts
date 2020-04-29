import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute, ResolveEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //check the route first, if the route is resetPassword Request
    // then verify the token
    /* var tokenPassed = false;
    this.router.events.subscribe((routerData) => {
      if (routerData instanceof ResolveEnd) {
        //console.log(routerData.url)
        const routePath = routerData.url.split("?")[0].replace("/", "")
        //console.log(routePath)
        if (routePath == "resetPasswordRequest") {
          this.activatedRoute.queryParams.subscribe(params => {
            console.log(params['token'])
            const data = {
              token: params['token']
            }
            //check the token is correct
            this.authService.checkUserToken(data).subscribe(
              response => {
                const result = JSON.parse(JSON.stringify(response))
                console.log(result)
                if (result.status == "success"){
                  tokenPassed = true;
                }else {
                  tokenPassed = false;
                };
              }, error => {
                const errorResponse = JSON.parse(JSON.stringify(error)).error
                console.log(errorResponse.message)
                tokenPassed = false;
              })
          })
        }
      }
    })
    console.log(tokenPassed)
    return tokenPassed; */
    const getUserToken = this.authService.getToken();
    const userRoles = localStorage.getItem("roles");
    const userRolesAr = userRoles.split(",")
    let roleFound: boolean
    if(route.data.roles){
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
}
