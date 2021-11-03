import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ArtistsService } from '../artists/artists.service';
import { Booking, Gig, Month, Sunday, Year } from './program.models';
import * as fromRoot from './../app.reducer';
import * as PROGRAM from './../program/program.actions'
import { BookArtistComponent } from './book-artist/book-artist.component';
import { Artist } from '../artists/artist.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';
import * as UI from './../shared/ui.actions'
import * as fromAuth from './../auth/auth.reducer'
import { addGigsToMonthArray, addMonthsGigsToYearArray, yearsMonthsArray } from './create-calender';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  yearNames: string[] = [];
  monthNames = [];
  gigNames = [];
  years: Year[] = [];
  yearsChanged: Subject<Year[]>;
  openYears: Year[];
  bookedYears: Year[];
  bookings$: Observable<Booking[]>
  
  

  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    private store: Store<fromAuth.AuthState>,
    ) { }



  fetchBookings() {
    this.store.dispatch(new UI.StartLoading);
    this.db
      .collection('bookings', ref => ref.orderBy('booking.listPosition'))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc: any) => {
            return {
              bookingId: doc.payload.doc.id,
              booking: doc.payload.doc.data().booking
            }
          })
        })
      ).subscribe((res) => {
        this.store.dispatch(new UI.StopLoading);
        // ? CLEAR !
        this.removeAllArtistsFromAllGigs();
        res.forEach(res => {
          const booking: Booking = res.booking
          booking.bookingId = res.bookingId
          this.addBookingToGig(booking);
        })
      })
  }

  addBookingToGig(booking: Booking) {
    // FILLS UP ALL THE GIGS WITH ALL THE BOOKINGS
    this.years.forEach((year: Year) => {
      if (year.yearName === booking.date[2]) {
        year.months.forEach((month: Month) => {
          if (month.name === booking.date[0]) {
            month.gigs.forEach((gig: Gig) => {
              if (gig.name === booking.date[1]) {
                const bookingIds = []
                gig.bookings.forEach(booking => {
                  bookingIds.push(booking.bookingId);
                })
                if (bookingIds.includes(booking.bookingId)) {
                } else {
                  gig.bookings.push(booking);
                }
              }
            })
          }
        })
      }
    })
  }

  addBookingToDb(booking: Booking) {
    return this.db.collection('bookings').add({
      booking
    })
    .then(res => {
      return res;
    })
  }


  removeBookingFromDb(bookingId) {
    const message = 'This will remove the artist from the gig';
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {data: {message: message}});
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        return this.db
          .collection('bookings')
          .doc(bookingId)
          .delete()
          .then(res => {
            this.fetchBookings()
            return res;
          })
          .catch(err => {
          })
      }
      return;
    })
  }

  // removeGigFromProgram(bookingId) {
  //   this.years.forEach((year: Year) => {
  //     year.months.forEach((month: Month) => {
  //       month.gigs.forEach((gig: Gig) => {
  //         gig.bookings.forEach((booking: Booking) => {
  //         })
  //         const index = gig.bookings.findIndex((booking: Booking) => {
  //           return booking.bookingId == bookingId
  //         })
  //         gig.bookings.splice(index, 1);
  //       })
  //     } )
  //   })
  // }

  removeGigsFromMonths() {
    this.years.forEach((year: Year) => {
      year.months.forEach((month: Month) => {
        month.gigs = []
      })
    })
  }

  onGetOrderedGigs(dateNamesArray) {
    this.db.collection('bookings',
    ref => ref.orderBy('booking.listPosition')).get().subscribe(snaps => {
      snaps.forEach(snap => {
      })
    });
  }

  getGig(dateNamesArray): Observable<any> {
    return this.db.collection('bookings', ref => ref.orderBy('booking.listPosition'))
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map((doc: any) => {
          return {
            bookingId: doc.payload.doc.id,
            date: doc.payload.doc.data().booking.date,
            isFeatured: doc.payload.doc.data().booking.isFeatured,
            artist: doc.payload.doc.data().booking.artist,
            listPosition: doc.payload.doc.data().booking.listPosition
          }
        })
      })
    )
  }



  removeAllArtistsFromAllGigs() {
    this.years.forEach((year: Year) => {
      year.months.forEach((month: Month) => {
        month.gigs.forEach((gig: Gig) => {
          gig.bookings = []
        })
      })
    })
  }


  getYears(start, end) {
    this.removeGigsFromMonths();
    let sundays = []
    
    const rawSundays = this.getSundays(new Date(start), new Date(end));
    // RAWSUNDAYS: AN ARRAY WITH STRINGS, FORMATTED LIKE: '10/4/2021'
    // ? TURN THE STRING INTO AN ARRAY (MONTH-DATE-YEAR)
    rawSundays.forEach((sunday: string) => {
      sundays.push(sunday.split('/'))
    })
    // TURN EACH SUNDAY INTO AN INT-ARRAY [M, D, Y]
    sundays = this.sundaysToInt(sundays);
    // console.log(sundays);

    


    // for (let i = 0; i < sundays.length; i++) {
    //   if (!this.yearNames.includes(sundays[i][2]) || this.years.length === 0) {
    //     this.yearNames.push(sundays[i][2]);
    //     this.years.push({
    //       yearName: sundays[i][2],
    //       months: []
    //     })
    //   }
    // }

    this.years = yearsMonthsArray(sundays)
    
    // let years: Year[] = [];
    // for (let i = 0; i < sundays.length; i++) {
    //   console.log(sundays[i][2])
    //   if(years.length === 0) {
    //     years.push({
    //       yearName: sundays[i][2],
    //       months: []
    //     })
    //   } else {
    //     const index = years.findIndex((year: Year) => {
    //       return year.yearName === sundays[i][2];
    //     })
    //     console.log(index);
    //     if(index === -1) {
    //       years.push({
    //         yearName: sundays[i][2],
    //         months: []
    //       })
    //     }
    //   }
    // }
    
    // console.log(years);


    this.years = addMonthsGigsToYearArray(this.years, sundays)

    // ? ADD MONTHS
    // for (let i = 0; i < sundays.length; i++) {
    //   this.years.forEach((newYear: Year) => {
    //     if (sundays[i][2] === newYear.yearName) {
    //       if (!this.monthNames.includes(sundays[i][0]) || this.monthNames.length === 0) {
    //         this.monthNames.push(sundays[i][0]);
    //         newYear.months.push({
    //           name: sundays[i][0],
    //           gigs: []
    //         })
    //       }
    //     }
    //   })
    // }
    // ? ADD GIGS

    // this.addGigs(sundays)

    // ALL SUNDAYS

    this.years = addGigsToMonthArray(this.years, sundays) 

    // for (let i = 0; i < sundays.length; i++) {;
    //   // EVERY YEAR
    //   this.years.forEach((newYear: Year) => {
    //     // EVERY MONTH IN THAT YEAR
    //     newYear.months.forEach((month: Month) => {
    //       // IF THE FIRST ELEMENT IN THE SUNDAY-ARRAY CORRESPONDS WITH THE MONTH-NAME
    //       if (sundays[i][0] === month.name) {
    //         if (!this.gigNames.includes(sundays[i][1]) || this.gigNames.length === 0) {
    //           this.gigNames.push(sundays[i][1]);
    //           month.gigs.push({
    //             name: sundays[i][1],
    //             bookings: []
    //           })
    //         }
    //       }
    //     })
    //     this.gigNames = [];
    //   })
    // }
    return this.years
  }



  // addMyYears(sundays: Sunday[]) {
  //   const myYears: Year[] = [];
  //   console.log(myYears.length);
  //   sundays.forEach((sunday) => {
  //     if(myYears.length === 0) {
  //       myYears.push({
  //         yearName: sunday[2],
  //         months: []
  //       })
  //     } else {
  //       myYears.forEach((year: Year) => {
  //         if(year.yearName !== sunday[2]) {
  //           myYears.push({
  //             yearName: sunday[2],
  //             months: []
  //           })
  //         }
  //       })
  //     }
  //   })
  //   console.log(myYears.length);
  //   console.log(myYears);    
  // }



  // addGigs(sundays) {
  //   for (let i = 0; i < sundays.length; i++) {;
  //     // EVERY YEAR
  //     this.years.forEach((newYear: Year) => {
  //       // EVERY MONTH IN THAT YEAR
  //       newYear.months.forEach((month: Month) => {
  //         // IF THE FIRST ELEMENT IN THE SUNDAY-ARRAY CORRESPONDS WITH THE MONTH-NAME
  //         if (sundays[i][0] === month.name) {
  //           if (!this.gigNames.includes(sundays[i][1]) || this.gigNames.length === 0) {
  //             this.gigNames.push(sundays[i][1]);
  //             month.gigs.push({
  //               name: sundays[i][1],
  //               bookings: []
  //             })
  //           }
  //         }
  //       })
  //       this.gigNames = [];
  //     })
  //   }
  //   return this.years
  // }
  

  private getSundays(startDate, endDate) {
    var Sundays = [];
    var day = startDate.getDay();
    // FIND THE FIRST SUNDAY BETWEEN STARTDATE AND ENDDATE
    if (day != 0) startDate.setDate(startDate.getDate() + (7 - day));
    // CLEAN UP FIRST SUNDAY
    Sundays[0] = startDate.toLocaleString('en-US').split(',')[0];
    console.log(Sundays[0]);
    while (startDate) {
      startDate.setDate(startDate.getDate() + 7);
      if (startDate > endDate) {
        return Sundays
      };
      Sundays.push(startDate.toLocaleDateString('en-US'));
      
    }
  }

  private sundaysToInt(sundays) {
    sundays.forEach(sunday => {
      sunday[0] = parseInt(sunday[0])
      sunday[1] = parseInt(sunday[1])
      sunday[2] = parseInt(sunday[2])
    })
    console.log(sundays);
    return sundays;
  }
}
