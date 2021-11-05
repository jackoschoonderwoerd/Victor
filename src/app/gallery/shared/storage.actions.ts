import { Action } from '@ngrx/store';
import { ImageUrls } from './models/artwork.model';

// import { FileUrls } from './storage.service';


export const FILEPATHS_URLS_COMPLETE = '[STORAGE] FilePaths And Urls complete';
// export const COMPLETED_200x200 = '[STORAGE] _200X200 Complete'
// export const STOP_LOADING = '[UI] Stop Loading';




export class FilePathsAndUrlsComplete implements Action {
  readonly type = FILEPATHS_URLS_COMPLETE
  constructor(
    public filePaths: string[], 
    public completedUrls: ImageUrls
    ) {}
}
// export class Completed_200x200 implements Action {
  // readonly type = COMPLETED_200x200
  // constructor(public completed_200_200) {}
// }

export type StorageActions = FilePathsAndUrlsComplete
 