import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from './../app.reducer';

import { take } from 'rxjs/operators';

@Injectable()

export class AuthAdminGuard implements CanLoad, CanActivate {
  isAuth$: Observable<boolean>

  constructor(private store: Store<fromRoot.GlobalState>) {}

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAdmin).pipe(take(1));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAdmin).pipe(take(1));
  }
}