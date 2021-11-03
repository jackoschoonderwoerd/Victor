import {
  AuthActions,
  SET_IS_ADMIN,
  SET_IS_NOT_ADMIN,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean,
  userEmail: string,
  isAdmin: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  userEmail: null,
  isAdmin: false
}

export function authReducer(state = initialState, action: AuthActions) {
  switch(action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        userEmail: action.userEmail
      }
    case SET_UNAUTHENTICATED: 
      return {
        ...state,
        isAuthenticated: false,
        userEmail: null
      }
    case SET_IS_ADMIN: 
      return {
        ...state,
        isAdmin: true
      }
    case SET_IS_NOT_ADMIN:
      return {
        ...state,
        isAdmin: false
      }
    default: 
      return {
        ...state
      }
  }
}

export const getIsAuth = (state: AuthState) => state.isAuthenticated;
export const getUserEmail = (state: AuthState) => state.userEmail;
export const getIsAdmin = (state: AuthState) => state.isAdmin;