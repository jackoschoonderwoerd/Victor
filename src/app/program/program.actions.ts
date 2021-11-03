import { Action } from '@ngrx/store'
import { Artist } from '../artists/artist.model';
import { Booking, Year } from './program.models';

export const YEAR_CHANGED = '[Program] Year Changed'
export const SET_DATE = '[Program], Set Date'
export const IS_SHOWCASE_OPEN = '[Program], Is Showcase Open'
export const SET_ARTIST_ID = '[Program], Selected Artist'
export const SET_ARTIST = '[Program], Set Artist'
export const SET_BOOKING = '[Program] Set Booking' 

export class YearChanged implements Action {
  readonly type = YEAR_CHANGED
  constructor(public years: Year[]) {}
}

export class SetDate implements Action {
  readonly type = SET_DATE
  constructor(public date: number[]) {}
}

export class IsShowcaseOpen implements Action {
  readonly type = IS_SHOWCASE_OPEN
  constructor(public isOpen: boolean) {}
}
export class SetArtistId implements Action {
  readonly type = SET_ARTIST_ID
  constructor(public artistId: string) {}
}
export class SetArtist implements Action {
  readonly type = SET_ARTIST
  constructor(public artist: Artist) {}
}
export class SetBooking implements Action {
  readonly type = SET_BOOKING
  constructor(public booking: Booking) {}
}

export type ProgramActions = 
  // SetAuthenticated | 
  // SetUnauthenticated | 
  // SetIsAdmin | 
  // SetIsNotAdmin | 
  YearChanged |
  SetDate |
  IsShowcaseOpen |
  SetArtistId |
  SetArtist |
  SetBooking