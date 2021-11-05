import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ImageUrls } from '../gallery/shared/models/artwork.model';
import * as fromApp from './../app.reducer';
import * as SHOWCASE from './showcase.actions'

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {


  imageUrls$: Observable<ImageUrls>

  constructor(
    private store: Store<fromApp.GlobalState>
  ) { }

  ngOnInit(): void {
    this.imageUrls$ = this.store.select(fromApp.getImageUrls);
  }
  closeShowcase() {
    this.store.dispatch(new SHOWCASE.ShowcaseInactive);
  }
}
