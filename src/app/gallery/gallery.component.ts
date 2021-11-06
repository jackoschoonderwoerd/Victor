// https://www.youtube.com/watch?v=iX_QyjdctsQ

import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { DbService } from './shared/db.service';
import { ArtWork, ImageUrls } from './shared/models/artwork.model';
import { StorageService } from './shared/storage.service';
import { UiService } from './shared/ui.service';
import * as fromRoot from './../app.reducer'
import { Store } from '@ngrx/store';
;
import * as SHOWCASE from './../showcase/showcase.actions';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';


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
  faEdit = faEdit;
  faInfo = faInfo;
  faPlus = faPlus;
  faTrash = faTrash;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    console.log('resizing');
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 428) {
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
    if (this.screenWidth > 428) {
      this.isMobile = false;
    }

    this.store.subscribe(data => console.log(data));
    this.images$ = this.dbService.getImages();
    this.dbService.getImages();
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }
  onInfo(e: Event, artwork: ArtWork) {
    e.stopPropagation();
    console.log(artwork);
    this.dialog.open(InfoComponent, {
      data: {
        title: artwork.title,
        caption: artwork.caption,
        price: artwork.price
      },
      minWidth: '320px'

    })
  }

  activateShowcase(urls: ImageUrls) {
    if (!this.isMobile) {
      console.log('activateShowcase()')
      console.log(urls);
      this.store.dispatch(new SHOWCASE.ShowcaseActive(urls))
    }
  }

  onEdit(artWork: ArtWork) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        title: artWork.title,
        caption: artWork.caption,
        price: artWork.price,
        listPosition: artWork.listPosition
      },
      minWidth: '320px',
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
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: 'This will permanently remove the image-file and all of it\'s information from the database'
      },
      width: '320px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
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
      return;
    });
  }

  // ========= DYNAMIC CSS ============

  getHeight() {
    console.log(this.screenWidth);
    return {
      height: this.screenWidth + 'px'
    }
  }

}
