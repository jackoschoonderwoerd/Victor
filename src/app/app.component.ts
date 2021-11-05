import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './app.reducer'


import { AuthService } from './auth/auth.service';
import { ImageUrls } from './gallery/shared/models/artwork.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private swUpdate: SwUpdate,
    private store: Store<fromRoot.GlobalState>
    ) {}

  title = 'victor';
  isShowcaseActive$: Observable<boolean>;
  imageUrls$: Observable<ImageUrls>

  ngOnInit() {
    this.store.subscribe(data => console.log(data));
    this.isShowcaseActive$ = this.store.select(fromRoot.getIsShowcaseActive);
    this.imageUrls$ = this.store.select(fromRoot.getImageUrls)
    this.authService.initAuthListener();
    if(this.swUpdate.isEnabled) {
      console.log('swUpdate enabled')
      this.swUpdate.available.subscribe(() => {
        if(confirm('New version available. Load new version?')) {
          window.location.reload();
        }
      });
    } 
  }
}

