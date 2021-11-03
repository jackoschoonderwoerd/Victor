import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from './../app.reducer';
import * as AUTH from './auth.actions';

import { take } from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanLoad, CanActivate {
  // isAuth$: Observable<boolean>
  // isAuthenticated$: Observable<boolean>

  constructor(
    private store: Store<fromRoot.GlobalState>,
    // private router: Router
    ) {}

  // ? pipe allows the usage of multiple operators on a given observable
  // ? take(1) only takes the first value and closes down afterwards

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  // canLoad(route: Route) {
  //   this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  //   if (this.store.select(fromRoot.getIsAuth).pipe(take(1))) {
  //     console.log('canload access granted');
  //     return true
  //   }
  //   console.log('canload access denied');
  //   return false
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.store.select(fromRoot.getIsAuth).pipe(take(1)))
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}