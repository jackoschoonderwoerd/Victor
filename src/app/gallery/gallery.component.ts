import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { DbService } from './shared/db.service';
import { ArtWork } from './shared/models/artwork.model';
import { StorageService } from './shared/storage.service';
import { UiService } from './shared/ui.service';
import * as fromApp from './../app.reducer'
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images$: Observable<any>
  selectedImageUrl: string;
  imageSelected: boolean = false;
  isAuhthenticated$: Observable<boolean>

  constructor(
    private store: Store<fromApp.GlobalState>,
    private dbService: DbService,
    private storageService: StorageService,
    private uiService: UiService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.images$ = this.dbService.getImages();
    this.dbService.getImages();
    this.isAuhthenticated$ = this.store.select(fromApp.getIsAuth)
  }
  onInfo(artwork: ArtWork) {
    console.log(artwork);
    this.dialog.open(InfoComponent, {data: {
      title: artwork.title,
      caption: artwork.caption,
      price: artwork.price
    }})
  }
  onEdit(artWork: ArtWork) {
    const dialogRef = this.dialog.open(EditComponent, {data: {
      title: artWork.title,
      caption: artWork.caption,
      price: artWork.price
    }})
    dialogRef.afterClosed().subscribe(data => {
      console.log(data)
      if(data) {
        console.log(data)
        artWork.title = data.title,
        artWork.caption = data.caption,
        artWork.price = data.price
        this.dbService.editImageDataInDB(artWork)
        .then((res) => {
          this.uiService.showSnackBar('artwork edited successful', null, 5000)
        })
        .catch(err => {
          this.uiService.showSnackBar('edit was unsuccessful', null, 5000)
        })
      } 
      return;
    })
    console.log(artWork)
  }
  onDelete(artwork: ArtWork) {
    console.log(artwork)
    // DELETE FROM DB

    this.dbService.deleteImageDataFromDb(artwork.id)
    .then(res => {
      console.log(res);
      this.uiService.showSnackBar('imagedata deleted from db', null, 5000)
      this.storageService.deleteFromStorage(artwork.filepaths)
      .then(res => {
        this.uiService.showSnackBar('filepaths deleted from storage', null, 5000)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
  }
}