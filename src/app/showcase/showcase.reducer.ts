import { ImageUrls } from '../gallery/shared/models/artwork.model';
import {
  ShowcaseActions,
  SHOWCASE_ACTIVE,
  SHOWCASE_INACTIVE
} from './showcase.actions'

export interface ShowcaseState {
  isActive: boolean,
  imageUrls: ImageUrls
}

const initialState: ShowcaseState = {
  isActive: false,
  imageUrls: null
}

export function showcaseReducer(state = initialState, action: ShowcaseActions) {
  switch(action.type) {
    case SHOWCASE_ACTIVE: 
      return {
        ...state,
        isActive: true,
        imageUrls: action.imageUrls
      };
    case SHOWCASE_INACTIVE:
      return {
        ...state,
        isActive: false
      };
    default: {
      return {
        ...state
      };
    }
  }
} 

export const getIsShowcaseActive = (state: ShowcaseState) => state.isActive;
export const getImageUrls = (state: ShowcaseState) => state.imageUrls