import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';


import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'victor';

  constructor(
    private authService: AuthService,
    private swUpdate: SwUpdate,
  ) {}

  ngOnInit() {
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

