import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { ArtWork } from '../shared/models/artwork.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

 faWindowClose = faWindowClose;

 artwork: ArtWork
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.artwork = this.data.artWork
  }

}
