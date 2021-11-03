import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

import * as fromStorage from './gallery/shared/storage.reducer'


export interface GlobalState {
  ui: fromUI.UIState,
  auth: fromAuth.AuthState,
  
  storage: fromStorage.StorageState
}

export const reducers: ActionReducerMap<GlobalState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  
  storage: fromStorage.storageReducer
  
}


export const getUiState = createFeatureSelector<fromUI.UIState>('ui');
export const getIsLoading  = createSelector(getUiState, fromUI.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)
export const getUserEmail = createSelector(getAuthState, fromAuth.getUserEmail);
export const getIsAdmin = createSelector(getAuthState, fromAuth.getIsAdmin);

export const getStorageState = createFeatureSelector<fromStorage.StorageState>('storage');
export const getCompletedUrls = createSelector(getStorageState, fromStorage.getCompletedUrls)


