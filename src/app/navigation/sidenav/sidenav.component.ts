import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer'

import { AuthService } from 'src/app/auth/auth.service';
import { Artist } from 'src/app/artists/artist.model';
import * as PROGRAM from './../../program/program.actions'



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();

  userEmail$: Observable<string>;
  isAdmin$: Observable<boolean>;
  isAuth$: Observable<boolean>;
  artist: Artist;


  constructor(
    private store: Store<fromRoot.GlobalState>,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.userEmail$ = this.store.select(fromRoot.getUserEmail);
    this.isAdmin$ = this.store.select(fromRoot.getIsAdmin);
    this.isAuth$ =  this.store.select(fromRoot.getIsAuth);
    this.store.subscribe((storeData) => {
      this.artist = storeData.program.artist
    })
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onProgram() {
    if(this.artist) {
      this.store.dispatch(new PROGRAM.IsShowcaseOpen(false));
    }
      this.onClose();
  }
  
  onLogOut() {
    this.authService.logOut();
    this.onClose()
  }
}
