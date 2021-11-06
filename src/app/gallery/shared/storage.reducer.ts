import { ImageUrls } from './models/artwork.model';
import {
  StorageActions,
  FILEPATHS_URLS_COMPLETE,
  FilePathsAndUrlsComplete,
  UPLOAD_FAILED,
  UploadFailed
} from './storage.actions';

// import { Url } from './storage.service';

export interface StorageState {
  completedUrls: ImageUrls | undefined,
  _200x200: string
  filePaths: string[]
  uploadFailed: boolean
}

const initialState: StorageState = {
  completedUrls: {
    _original: null,
    _200x200: null,
    _320x320: null,
    _430x430: null,
    _640x640: null,
    _1440x1440: null
  },
  _200x200: '',
  filePaths: [],
  uploadFailed: false
}

export function storageReducer(state = initialState, action: StorageActions) {
  switch(action.type) {
    case FILEPATHS_URLS_COMPLETE:
      return {
        ...state,
        // isAuthenticated: true,
        // userEmail: action.userEmail
        completedUrls: action.completedUrls,
        filePaths: action.filePaths
      }
    case UPLOAD_FAILED: {
      return {
        ...state,
        uploadFailed: true 
      }
    }
    default: 
      return {
        ...state
      }
  }
}

export const getCompletedUrls = (state: StorageState) => state.completedUrls;
export const getUploadFailed = (state: StorageState) => state.uploadFailed;
