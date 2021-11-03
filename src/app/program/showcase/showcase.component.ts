import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/artists/artist.model';
import { Booking } from '../program.models';
import * as fromRoot from './../../app.reducer'
import * as PROGRAM from './../program.actions'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowcaseComponent implements OnInit {


  artist$: Observable<Artist>
  booking$: Observable<Booking>
  isLoading$: Observable<boolean>
  

  faWindowClose = faWindowClose




  // artistId: string

  constructor(
    private store: Store<fromRoot.GlobalState>,
  ) {

  }

  ngOnInit(): void {

    this.booking$ = this.store.select(fromRoot.getBooking);
    this.artist$ = this.store.select(fromRoot.getArtist);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);


  }

  onCloseShowcase() {
    this.store.dispatch(new PROGRAM.IsShowcaseOpen(false));
    setTimeout(() => {
      this.store.dispatch(new PROGRAM.SetArtist(null));
    }, 1000);
    
  }
  scroll(e) {
    console.log(e);
  }
}
