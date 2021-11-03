import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer'

import { AuthService } from 'src/app/auth/auth.service';





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
  


  constructor(
    private store: Store<fromRoot.GlobalState>,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.userEmail$ = this.store.select(fromRoot.getUserEmail);
    this.isAdmin$ = this.store.select(fromRoot.getIsAdmin);
    this.isAuth$ =  this.store.select(fromRoot.getIsAuth);
   
  }

  onClose() {
    this.closeSidenav.emit();
  }

 
  
  onLogOut() {
    this.authService.logOut();
    this.onClose()
  }
}
