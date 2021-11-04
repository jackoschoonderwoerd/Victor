// https://www.youtube.com/watch?v=iX_QyjdctsQ

import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { DbService } from './shared/db.service';
import { ArtWork } from './shared/models/artwork.model';
import { StorageService } from './shared/storage.service';
import { UiService } from './shared/ui.service';
import * as fromRoot from './../app.reducer'
import { Store } from '@ngrx/store';
import { ShowDetailComponent } from './show-detail/show-detail.component';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  
  images$: Observable<any>
  selectedImageUrl: string;
  imageSelected: boolean = false;
  isAuth$: Observable<boolean>;
  public screenWidth: any;
  public screenHeight: any;
  isMobile: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    console.log('resizing');
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if(this.screenWidth > 428) {
      this.isMobile = false;
    }
  }
  
  constructor(
    private store: Store<fromRoot.GlobalState>,
    private dbService: DbService,
    private storageService: StorageService,
    private uiService: UiService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    // console.log('HEIGHT: ', window.innerHeight);
    // console.log('WIDTH: ', window.innerWidth)
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if(this.screenWidth > 428) {
      this.isMobile = false;
    }
    
    this.store.subscribe(data => console.log(data));
    this.images$ = this.dbService.getImages();
    this.dbService.getImages();
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }
  onInfo(artwork: ArtWork) {
    console.log(artwork);
    this.dialog.open(InfoComponent, {
      data: {
        title: artwork.title,
        caption: artwork.caption,
        price: artwork.price
      }
    })
  }

  showDetail(urls: string[]) {
    if(!this.isMobile) {
      this.dialog.open(ShowDetailComponent, {
        data: {
          urls: urls,
          isMobile: this.isMobile
        }, 
      })
    }
    return
  }

  onEdit(artWork: ArtWork) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        title: artWork.title,
        caption: artWork.caption,
        price: artWork.price,
        listPosition: artWork.listPosition
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      console.log(data)
      if (data) {
        console.log(data)
        artWork.title = data.title,
          artWork.caption = data.caption,
          artWork.price = data.price
        artWork.listPosition = data.listPosition
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

  // ========= DYNAMIC CSS ============

  getHeight() {
    console.log(this.screenWidth);
    return {
      height : this.screenWidth + 'px'
    }
  }

}
