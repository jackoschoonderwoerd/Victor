import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromProgram from './program/program.reducer';
import * as fromStorage from './gallery/shared/storage.reducer'


export interface GlobalState {
  ui: fromUI.UIState,
  auth: fromAuth.AuthState,
  program: fromProgram.ProgramState,
  storage: fromStorage.StorageState
}

export const reducers: ActionReducerMap<GlobalState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  program: fromProgram.programReducer,
  storage: fromStorage.storageReducer
  
}

export const getProgramState = createFeatureSelector<fromProgram.ProgramState>('program');
export const getYears = createSelector(getProgramState, fromProgram.getYears);
export const getDate = createSelector(getProgramState, fromProgram.getDate);
export const isShowcaseOpen = createSelector(getProgramState, fromProgram.isShowcaseOpen);
export const getArtistId = createSelector(getProgramState, fromProgram.getArtistId);
export const getArtist = createSelector(getProgramState, fromProgram.getArtist);
export const getBooking = createSelector(getProgramState, fromProgram.getBooking);

export const getUiState = createFeatureSelector<fromUI.UIState>('ui');
export const getIsLoading  = createSelector(getUiState, fromUI.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)
export const getUserEmail = createSelector(getAuthState, fromAuth.getUserEmail);
export const getIsAdmin = createSelector(getAuthState, fromAuth.getIsAdmin);

export const getStorageState = createFeatureSelector<fromStorage.StorageState>('storage');
export const getCompletedUrls = createSelector(getStorageState, fromStorage.getCompletedUrls)


