import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artist } from 'src/app/artists/artist.model';
import { ArtistsService } from 'src/app/artists/artists.service';
import { UIService } from 'src/app/shared/ui.service';
import { Booking, Gig } from '../program.models';
import { ProgramService } from '../program.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-book-artist',
  templateUrl: './book-artist.component.html',
  styleUrls: ['./book-artist.component.scss']
})
export class BookArtistComponent implements OnInit {

  faTrash = faTrash
  bookArtistForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  artist: Artist;
  artists: Artist[];
  checked: boolean = false;
  artistName: string = null;
  date: Date;
  selectedArtist
  artists$: Observable<Artist[]>
  monthName: number;
  dateName: number;
  yearName: number;
  dateNamesArray: number[];
  gigs: Observable<Gig>
  selectedBookings$: Observable<any>;
  listPositions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


  constructor(
    private formBuilder: FormBuilder,
    private uiService: UIService,
    private artistService: ArtistsService,
    private programService: ProgramService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.initAddArtistForm();
    // const dateNamesArray = this.route.snapshot.paramMap.get('dateNames').split(',').map(Number);
    if (this.route.snapshot.paramMap.get('dateNames')) {
      this.dateNamesArray = this.route.snapshot.paramMap.get('dateNames').split(',').map(Number);
      this.monthName = this.dateNamesArray[0];
      this.dateName = this.dateNamesArray[1];
      this.yearName = this.dateNamesArray[2];
    } else {
      this.uiService.showSnackbar('NO DATE', null, 5000);
      this.router.navigate(['program'])
    }
    this.artists$ = this.artistService.fetchArtists()
    this.selectedBookings$ = this.programService.getGig(this.dateNamesArray)
    this.programService.getGig(this.dateNamesArray).subscribe(data => {
      console.log(data);
    })
    // this.programService.onGetOrderedGigs(this.dateNamesArray);
  }


  initAddArtistForm() {
    this.bookArtistForm = this.formBuilder.group({
      artist: new FormControl(null, [Validators.required]),
      listPosition: new FormControl(null, [Validators.required]),
      isFeatured: new FormControl(false),
    })
  }

  onBookArtist(destination) {
    console.log(destination)
    const booking: Booking = {
      artist: this.bookArtistForm.value.artist,
      isFeatured: this.bookArtistForm.value.isFeatured,
      date: this.dateNamesArray,
      listPosition: this.bookArtistForm.value.listPosition
    }
    this.programService.addBookingToDb(
      booking
    ).then((res) => {
      this.uiService.showSnackbar('ARTIST BOOKED', null, 9000);
      this.bookArtistForm.patchValue({
        isFeatured: false,
        artist: null,
        listPosition: null
      });
      if (destination === 'program') {
        this.router.navigate(['program']);
      }
    }).catch(err => {
      this.uiService.showSnackbar(`Error booking artist: ${err}`, null, 9000);
    })
  }
  onRemove(bookingId) {
    this.programService.removeBookingFromDb(bookingId)
  }
  onReturnToProgram() {
    this.router.navigate(['/program'])
  }
}
