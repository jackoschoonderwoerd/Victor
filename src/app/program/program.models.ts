import { Artist } from "../artists/artist.model";


export interface Booking {
  bookingId?: string;
  artist: Artist;
  isFeatured: boolean;
  listPosition: number;
  date: number[]
}

export interface Gig {
  name: number,
  bookings?: Booking[]
  // artists?: Artist[]
}

export interface Month {
  name: number,
  gigs: Gig[]
}

export interface Year {
  yearName: number;
  months: Month[];
}

export interface Program {
  years: Year[]
}

export interface Sunday {
  month: number,
  date: number,
  year: number
}
