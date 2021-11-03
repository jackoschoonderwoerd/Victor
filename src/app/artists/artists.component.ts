import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Artist } from './artist.model';
import { ArtistsService } from './artists.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  artists$: Observable<any>

  
  faTrash = faTrash

  constructor(
    private router: Router,
    private artistsService: ArtistsService,
    private dialog: MatDialog,
    
  ) { }

  ngOnInit(): void {


    this.artists$ = this.artistsService.fetchArtists()
    
  }
  onRoute(route) {
    this.router.navigate([route]);
  }
  onEditArtist(artistId) {
    console.log(artistId)
    this.router.navigate(['artists/create-artist', {artistId: artistId}]);
  }

  onDeleteArtist(artist) {
    const message = 'this will permanently remove the selected artist';
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {data: {message: message}})
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if(data) {
        this.artistsService.deleteArtist(artist);
      } 
      return;
    })
  }
}
