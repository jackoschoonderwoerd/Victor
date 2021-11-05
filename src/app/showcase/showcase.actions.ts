import { Action } from '@ngrx/store';
import { ImageUrls } from '../gallery/shared/models/artwork.model';


export const SHOWCASE_ACTIVE = '[Showcase] Showcase Active';
export const SHOWCASE_INACTIVE = '[Showcase] Showcase Inactive';




export class ShowcaseActive implements Action {
  readonly type = SHOWCASE_ACTIVE;
  constructor(public imageUrls: ImageUrls) {}
}

export class ShowcaseInactive implements Action {
  readonly type = SHOWCASE_INACTIVE
}



export type ShowcaseActions = 
  ShowcaseActive | 
  ShowcaseInactive