import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route :ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  return !!window.localStorage.getItem("auth_token");
};
