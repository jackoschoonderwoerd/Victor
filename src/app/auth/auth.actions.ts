import { Action } from '@ngrx/store'

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_IS_ADMIN = '[Auth] Set Is Admin'
export const SET_IS_NOT_ADMIN = '[Auth] Set Is not Admin'

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED
  constructor(public userEmail: string) {}
}
export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED
}

export class SetIsAdmin implements Action {
  readonly type = SET_IS_ADMIN
  constructor(public isAdmin: boolean) {}
}

export class SetIsNotAdmin implements Action {
  readonly type = SET_IS_NOT_ADMIN
}

export type AuthActions = SetAuthenticated | SetUnauthenticated | SetIsAdmin | SetIsNotAdmin