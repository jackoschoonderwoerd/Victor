import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';

import { Store } from '@ngrx/store'
import * as fromRoot from './app.reducer';
import { AuthService } from './auth/auth.service';
import * as UI from './shared/ui.actions';
import { VirusWarningComponent } from './shared/virus-warning/virus-warning.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'victor';

  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll(event) {
  //   console.log(event)
  // }
  
  
  constructor(
    private authService: AuthService,
    private swUpdate: SwUpdate,
    private dialog: MatDialog
    
  ) {}

  ngOnInit() {
    this.authService.initAuthListener();
    // this.dialog.open(VirusWarningComponent);
    if(this.swUpdate.isEnabled) {
      console.log('swUpdate enabled')
      this.swUpdate.available.subscribe(() => {
        if(confirm('New version available. Load new version?')) {
          window.location.reload();
        }
      });
    }
    
  }
  onScroll(e) {
    console.log(e)
  }
}

