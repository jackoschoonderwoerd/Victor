import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

import * as fromStorage from './gallery/shared/storage.reducer'
import * as fromShowcase from './showcase/showcase.reducer'


export interface GlobalState {
  ui: fromUI.UIState;
  auth: fromAuth.AuthState;
  showcase: fromShowcase.ShowcaseState;
  storage: fromStorage.StorageState;
}

export const reducers: ActionReducerMap<GlobalState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  
  storage: fromStorage.storageReducer,
  showcase: fromShowcase.showcaseReducer
  
}


export const getUiState = createFeatureSelector<fromUI.UIState>('ui');
export const getIsLoading  = createSelector(getUiState, fromUI.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)
export const getUserEmail = createSelector(getAuthState, fromAuth.getUserEmail);
export const getIsAdmin = createSelector(getAuthState, fromAuth.getIsAdmin);

export const getStorageState = createFeatureSelector<fromStorage.StorageState>('storage');
export const getCompletedUrls = createSelector(getStorageState, fromStorage.getCompletedUrls)

export const getShowcaseState = createFeatureSelector<fromShowcase.ShowcaseState>('showcase');
export const getIsShowcaseActive = createSelector(getShowcaseState, fromShowcase.getIsShowcaseActive);
export const getImageUrls = createSelector(getShowcaseState, fromShowcase.getImageUrls);


