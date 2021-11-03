import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer'
import * as STORAGE from './../../gallery/shared/storage.actions'
import { throwError } from 'rxjs';
import { catchError, concatMap, last, tap } from 'rxjs/operators';
import { DbService } from '../shared/db.service';
import { StorageService } from '../shared/storage.service';
import { title } from 'process';
import { ArtWork, ImageUrls } from '../shared/models/artwork.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';
import { timeStamp } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOverwriteComponent } from './confirm-overwrite/confirm-overwrite.component';



@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})

export class UploadImageComponent implements OnInit {

  urlsObject: ImageUrls = {
    _200x200: '',
    _320x320: '',
    _640x640: '',
    _1440x1440: '',
    _original: ''
  }
  checkTitleAvailableForm: FormGroup;
  imageDataForm: FormGroup;
  urls: string[] = [];
  urlsComplete: boolean = false;
  retrievingData: boolean = false;
  urlsPresent: boolean = false;
  previewUrl_200x200$
  completedUrls: ImageUrls;
  filepaths: string[];
  fileSelected: boolean = false 
  @ViewChild('fileInput') public fileInput: ElementRef
  
  myPreview: string = 'https://firebasestorage.googleapis.com/v0/b/photo-gallery-d40b0.appspot.com/o/9-images_200x200.jpg?alt=media&token=4ac7c17d-0656-434f-a1b0-2bcb1960fbaa'
  
  constructor(
    private fb: FormBuilder,
    private dbService: DbService,
    private storageService: StorageService,
    private store: Store<fromRoot.GlobalState>,
    private uiService: UiService,
    private dialog: MatDialog,
    
  ) { }

  ngOnInit(): void {
    // this.mainFunction()
    // this.previewUrl_200x200$ = this.store.select(fromRoot.getCompletedUrls)
    this.store.subscribe(storeData => {
      console.log(storeData.storage.completedUrls)
      this.completedUrls = storeData.storage.completedUrls;
      if(this.completedUrls._original !== null) {
        this.fileSelected = true;
      }
      this.filepaths = storeData.storage.filePaths;
      this.retrievingData = false;
      this.urlsPresent = true
    });
    this.initCheckTitleAvailable();
    this.initImageDataForm();
    this.clearFormsAndFileInput();
  }

  initCheckTitleAvailable () {
    this.checkTitleAvailableForm = this.fb.group({
      title: new FormControl('title 01', Validators.required)
    })
  }

  // mainFunction = async () => {
  //   const result = await this.storageService.asynchronousFunction('')
  //     .then(res => console.log('RES: ', res))
  //     .catch(err => console.log(err));
  //   return result
  // }

  initImageDataForm() {
    this.imageDataForm = this.fb.group({
      title: new FormControl('title 01', Validators.required),
      caption: new FormControl('caption 01', Validators.required),
      price: new FormControl(25, Validators.required)
    })
  }
  // onCheckTitleAvailable() {
  //   this.dbService.checkTitleAvailable(this.checkTitleAvailableForm.value.title)
  // }

  onFileSelected(event: any) {
    this.retrievingData = true
    const file: File = event.target.files[0];
    const filename = file.name
    // CHECK FOR EXISTING STORAGEFILENAME
    this.storageService.checkForExistingStorageName(filename).then(
      res => {
        console.log(res)
        if(res !== -1) {
          console.log('existing file')
          const dialogRef = this.dialog.open(ConfirmOverwriteComponent)
          dialogRef.afterClosed().subscribe(res => {
            if(res) {
              console.log('proceed form dialog')
              this.fileSelected = true;
              this.storageService.uploadToStorageAndGetUrls(file)
            } else {
              console.log('abort from dialog')
              this.clearFormsAndFileInput()
            }
          })
        } else {
          console.log('proceed');
          this.fileSelected = true;
          this.storageService.uploadToStorageAndGetUrls(file)
        }
      });
  }

  onStoreImageDataInDb() {
    console.log(this.imageDataForm.value);
    const imageDataFormValue = this.imageDataForm.value
    const artwork: ArtWork = {
      title: imageDataFormValue.title,
      caption: imageDataFormValue.caption,
      price: imageDataFormValue.price,
      urls: {
        _original: this.completedUrls._original,
        _200x200: this.completedUrls._200x200,
        _320x320: this.completedUrls._320x320,
        _640x640: this.completedUrls._640x640,
        _1440x1440: this.completedUrls._1440x1440
      },
      filepaths: this.filepaths
    }

    this.dbService.storeImageDataInDb(artwork)
    .then(res => {
      console.log(res);
      this.uiService.showSnackBar('artwork uploaded to db', null, 5000);
      this.clearFormsAndFileInput();
    })
    .catch(err => {
      console.log(err);
      this.uiService.showSnackBar('artwork NOT uploaded', null, 5000);
    });
  }
  clearFormsAndFileInput() {
    // console.log(this.fileInput.nativeElement.value)
    this.checkTitleAvailableForm.reset();
    this.imageDataForm.reset();
    
    if(!this.fileInput === undefined) {

      this.fileInput.nativeElement.value = '';
    }
    
    this.completedUrls = {
      _original: null,
      _200x200: null,
      _320x320: null,
      _640x640: null,
      _1440x1440: null
    };
    this.retrievingData = false;
  }
}
