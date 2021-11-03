import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GlobalState } from '../app.reducer';
import * as fromApp from './../app.reducer'
import * as fromProgram from './../program/program.reducer'
import * as PROGRAM from './../program/program.actions';
import { Booking, Gig, Year } from './program.models';
import { ProgramService } from './program.service';
import { ArtistsService } from '../artists/artists.service';
import { Artist } from '../artists/artist.model';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { calculateDateMonthsFromNow, setStartingDateString } from './create-calender';
// import { getYears, sayHi } from './create-calender';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgramComponent implements OnInit {

  @ViewChild('target') target: HTMLElement

  isAdmin$: Observable<boolean>;
  condition: boolean = true;
  years: Year[];
  bookedYears$: Observable<Year[]>
  isAuthenticated
  isAuthenticated$
  isLoading$: Observable<boolean>
  yearOpen: number = 2022;
  monthOpen: number;
  dayOpen: number;
  dateOpen: number[] = [];
  dateOpen$: Observable<number[]>
  showcaseOpen: boolean = true;
  showcaseOpen$: Observable<boolean>;
  // bookedYears: Year[];
  test: boolean = true;
  pageY: number;
  faChevronLeft = faChevronLeft
  startingDayString: string;
  showAll: boolean = false;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
  }

  constructor(
    private router: Router,
    private store: Store<GlobalState>,
    private programService: ProgramService,
    private artistService: ArtistsService
  ) { }

  ngOnInit(): void {
    // sayHi()
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    this.dateOpen$ = this.store.select(fromApp.getDate);
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
    this.store.subscribe(storeContent => {
      this.isAuthenticated = storeContent.auth.isAuthenticated
    })
    this.store.subscribe(storeContent => {
      this.showcaseOpen = storeContent.program.isShowcaseOpen
    })
    this.showcaseOpen$ = this.store.select(fromApp.isShowcaseOpen)
    this.years = this.programService.getYears(setStartingDateString(), calculateDateMonthsFromNow(6));
    this.programService.removeAllArtistsFromAllGigs()
    this.isAdmin$ = this.store.select(fromApp.getIsAdmin);
    this.programService.fetchBookings();
  }


  onShowAll() {
    if(this.showAll === false) {
      this.showAll = true;
      this.years = this.programService.getYears('9/1/2021', calculateDateMonthsFromNow(6));
      console.log(this.years)
      this.programService.fetchBookings();
    } else if (this.showAll === true) {
      this.showAll = false;
      this.years = this.programService.getYears(setStartingDateString(), calculateDateMonthsFromNow(6));
      console.log(this.years);
      this.programService.fetchBookings();
    }
  }


  onGigDate(monthName: number, gigName: number, yearName: number) {
    const selectedDateNames = [monthName, gigName, yearName]
    if(this.isAuthenticated) {
      this.router.navigate(['program/book-artist', {dateNames: selectedDateNames}])
    }
  }



  openedChange(e) {
    this.store.dispatch( new PROGRAM.IsShowcaseOpen(e))
  }

  bookingSelected(booking: Booking) {
    // DO NOT OPEN THE SHOWCASE WHEN THE ARTIST'S NAME IS 'tba'
    if(booking.artist.name !== 'tba') {
      this.artistService.fetchArtistById(booking.artist.artistId)
      .subscribe((artist: Artist) => {
        this.store.dispatch(new PROGRAM.SetArtist(artist));
        this.store.dispatch(new PROGRAM.IsShowcaseOpen(true));
      })
      this.store.dispatch(new PROGRAM.SetDate(booking.date));
      this.store.dispatch(new PROGRAM.SetArtistId(booking.artist.artistId));
      this.store.dispatch(new PROGRAM.SetBooking(booking))
    }
  }

  onDeleteBooking(id) {
    if(this.isAuthenticated) {
      this.programService.removeBookingFromDb(id);
    } else {
      alert ('you have to be logged in')
    }
  }

  // ============= DYNAMIC CSS ===================

  monthPanelExpanded() {
    return {
      // top: -this.pageY + 100 + 'px'
      // top: '-100px'
      backgroundColor: 'var(--jazz-green)',
      padding: '0.5em',
      
    }
  }
  monthPanelClosed() {
    return {
      backgroundColor: 'var(--jazz-orange)',
      // top: null
    }
  }
  monthTitleExpanded () {
    return {
      color: 'var(--jazz-black)',
      textTransform: 'uppercase',
      fontSize: '2rem',
      fontWeight: '400'
    }
  }

  monthNameContainerOpen () {
    return {
      backgroundColor: 'var(--jazz-red)',
      padding: '8px 3px 5px 6px',
      borderRadius: '4px',
      border: '1px solid black',

    }
  }

  monthNameContainerClosed() {

  }

  monthTitleClosed () {

  }


 
  gigTitleExpanded(bookings: Booking[]) { // date 28
    return {
      // border: '5px solid green',
      color: 'var(--jazz-black)',
      fontSize: '1.5rem',
      fontWeight: '500',
      // border: '1px solid black',
      padding: '8px 8px 5px 8px',
      borderRadius: '4px',
      backgroundColor: 'var(--jazz-green)'
    }
  }
  gigPanelExpanded() { // list of non-featured artists
    return {
      backgroundColor: 'var(--jazz-red)',
      color: 'var(--jazz-black)',
    }
  }
  gigPanelClosed() {
    return {
      backgroundColor: 'var(--jazz-red)',
      border: '2px solid var(--jazz-black)',
      margin: '1rem'
      // position: 'static'
    }
  }
  gigTitleClosed () {

  }
  gigDescriptionExpanded (bookings: Booking[]) { // featured artist name list
    // if(this.getNumberFeatured(bookings) === 2) {
    //   return {
    //   }
    // } else {
    //   return {
    //     color: 'purple',
    //     textTransform: 'uppercase',
    //     fontSize: '1.5rem',
    //   }
    // }
  }
  gigDescriptionClosed () {

  }
  gigListItemExpanded() { // non-featured artist name list
    return {

      backgroundColor: 'var(--jazz-green)',
      border: '1px solid var(--jazz-black)',
      borderRadius: '4px',
      fontSize: '1.3rem'
    }
  }
  gigListItemTitleClosed() {

  }
  featuredArtistNameExpanded(bookings: Booking[]) { // BEN VAN DEN DUNGEN
    if(this.getNumberFeatured(bookings) === 2) {
      return {
        border: '1px solid black',
        color: 'var(--jazz-black)',
        fontWeight: '500',
        // border: '1px solid black',
        padding: '3px 8px 3px 8px',
        borderRadius: '4px',
        backgroundColor: 'var(--jazz-green)',
        marginBottom: '4px'
      }  
    } else {
      return {
        color: 'var(--jazz-black)',
        // fontSize: '1.5rem',
        fontWeight: '500',
        border: '1px solid black',
        padding: '3px 8px 3px 8px',
        borderRadius: '4px',
        backgroundColor: 'var(--jazz-green)',
      }
    }
  }

  featuredArtistNameClosed() {


  }
  private getNumberFeatured(bookings: Booking[]) {
    let numberFeatured = 0
    bookings.forEach((booking: Booking) => {
      if(booking.isFeatured) {
        numberFeatured++
        // if(numberFeatured === 2) {
        // }
      }
    })
    // if(numberFeatured === 2) {
    // }
    return numberFeatured;
  }

  numberFeatured(bookings: Booking[]) {
    // ADJUSTS THE SIZE OF THE MAT-EXPANSION-PANEL-HEADER DEPENDING ON THE AMOUNT OF FEATURED ARTISTS
    const numberFeatured = this.getNumberFeatured(bookings);
    switch(numberFeatured) {
      case 0: {
        return;
      }
      case 1:
        return {
          minHeight: '40px',  
        }
      case 2: {
        return {
          minHeight: '80px',  
        }
      }
      case 3: {
        return {
          minHeight: '100px',
        }
      }
      default: {
        console.log(numberFeatured)
      }
    }
  }
}
