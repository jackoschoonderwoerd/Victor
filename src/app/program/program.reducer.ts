import {
  ProgramActions,
  // SET_IS_ADMIN,
  // SET_IS_NOT_ADMIN,
  // SET_AUTHENTICATED,
  // SET_UNAUTHENTICATED,
  YEAR_CHANGED,
  SET_DATE,
  IS_SHOWCASE_OPEN,
  SET_ARTIST_ID,
  SET_ARTIST,
  SET_BOOKING
} from './program.actions';
import * as fromRoot from './../app.reducer'
import { Booking, Year } from './program.models';
import { Artist } from '../artists/artist.model';

export interface ProgramState {
  // isAuthenticated: boolean,
  // userEmail: string,
  // isAdmin: boolean
  date: number[]
  years: Year[]
  isShowcaseOpen: boolean;
  artistId: string;
  artist: Artist;
  booking: Booking;
}

export interface State extends fromRoot.GlobalState {

}

const initialState: ProgramState = {
  // isAuthenticated: false,
  // userEmail: null,
  // isAdmin: false
  years: [],
  date: [new Date().getMonth() + 1, new Date().getDate(), new Date().getFullYear()],
  isShowcaseOpen: false,
  artistId: null,
  artist: null,
  booking: null
}

export function programReducer(state = initialState, action: ProgramActions) {
  switch(action.type) {
   
    case YEAR_CHANGED:
      return {
        ...state,
        years: action.years
      }
    case SET_DATE: {
      return {
        ...state,
        date: action.date
      }
    }
    case IS_SHOWCASE_OPEN: {
      return {
        ...state,
        isShowcaseOpen: action.isOpen
      }
    }
    case SET_ARTIST_ID: {
      console.log(action)
      return {
        ...state,
        artistId: action.artistId
      }
    }
    case SET_ARTIST: {
    
      return {
        ...state,
        artist: action.artist
      }
    }
    case SET_BOOKING: {
      return {
        ...state,
        booking: action.booking
      }
    }
    default: 
      return {
        ...state
      }
  }
}

// export const getIsAuth = (state: ProgramState) => state.isAuthenticated;
// export const getUserEmail = (state: ProgramState) => state.userEmail;
// export const getIsAdmin = (state: ProgramState) => state.isAdmin;
export const getYears = (state: ProgramState) => state.years;
export const getDate = (state: ProgramState) => state.date;
export const isShowcaseOpen = (state: ProgramState) => state.isShowcaseOpen;
export const getArtistId = (state: ProgramState) => state.artistId;
export const getArtist = (state: ProgramState) => state.artist
export const getBooking = (state: ProgramState) => state.booking