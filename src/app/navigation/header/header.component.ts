import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import * as fromRoot from './../../app.reducer';
import * as PROGRAM from './../../program/program.actions'


import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

import { Artist } from 'src/app/artists/artist.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userEmail$: Observable<string>;
  isAdmin$: Observable<boolean>;
  isAuth$: Observable<boolean>;

  selectedLanguage$: Observable<string>
  language: string = 'dutch';
  expositionId: string;
  isShowcaseActive: boolean = false;
  artist: Artist
  faBars = faBars
  

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    private store: Store<fromRoot.GlobalState>,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.subscribe(data => console.log(data));
    this.userEmail$ = this.store.select(fromRoot.getUserEmail);
    this.isAdmin$ = this.store.select(fromRoot.getIsAdmin);
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    this.store.subscribe((storeData) => {
      this.artist = storeData.program.artist
    })
  }

  onProgram() {
    if(this.artist) {
      this.store.dispatch(new PROGRAM.IsShowcaseOpen(false))
    }
    this.router.navigate(['/program']);
  }

  onToggleSidenav() {
    // this.store.dispatch(new UI.OpenSidenav);
    this.sidenavToggle.emit()
  }
  onLogOut() {
    this.authService.logOut()
  }
  onLogo() {
    this.router.navigate(['/home']);
  }
}

