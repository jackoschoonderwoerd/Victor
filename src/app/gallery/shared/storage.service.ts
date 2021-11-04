import { Injectable } from '@angular/core';
import { AngularFireStorage, createStorageRef } from '@angular/fire/storage';

import { throwError } from 'rxjs';
import { catchError, concatMap, last, tap } from 'rxjs/operators';
import * as fromStore from './storage.reducer'
import * as STORAGE from './storage.actions'
import { Store } from '@ngrx/store';
import { ImageUrls } from './models/artwork.model';
import firebase from 'firebase/app';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOverwriteComponent } from '../upload-image/confirm-overwrite/confirm-overwrite.component';
import { FormattedMessageChain } from '@angular/compiler';





@Injectable({
  providedIn: 'root'
})
export class StorageService {

  urls: string[] = [];
  originalUrl: string
  urlsObject: ImageUrls = {
    _200x200: '',
    _320x320: '',
    _430x430: '',
    _640x640: '',
    _1440x1440: '',
    _original: ''
  }
  filePaths: string[] = [];

  constructor(
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private store: Store<fromStore.StorageState>
  ) { }

  deleteFromStorage = async(filepaths: string[]) => {
    
    console.log(filepaths);
    const response = await filepaths.forEach((path: string) => {
      console.log(path);
      return this.storage.storage.ref().child(path).delete()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    })
    return response
  }

  checkForExistingStorageName = async (filename) => {
    const response = await this.getStoredFilenames().then((storagenames: string[]) => {
      const index = storagenames.findIndex((storagename: string) => {
        return storagename === filename
      }) 
      return index
    })
    return response
  }

  uploadToStorageAndGetUrls(file) {
    
    const filename = file.name
    console.log(filename);
    console.log(this.filePaths);
    this.filePaths = [];
    console.log(this.filePaths);
    
    const measurments: string[] = ['', '_200x200', '_640x640', '_1440x1440']
    const filepath_original = filename
    const filepath_200x200 = filename.split('.')[0] + '_200x200' + '.' + filename.split('.')[1];
    const filepath_320x320 = filename.split('.')[0] + '_320x320' + '.' + filename.split('.')[1];
    const filepath_430x430 = filename.split('.')[0] + '_430x430' + '.' + filename.split('.')[1]
    const filepath_640x640 = filename.split('.')[0] + '_640x640' + '.' + filename.split('.')[1];
    const filepath_1440x1440 = filename.split('.')[0] + '_1440x1440' + '.' + filename.split('.')[1];

    this.filePaths.push(filepath_original, filepath_200x200, filepath_320x320, filepath_430x430, filepath_640x640, filepath_1440x1440);
    console.log(this.filePaths);
    


    const task = this.storage.upload(filepath_original, file, {
      cacheControl: 'max-age=2592000,public'
    });
    
    task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filepath_original).getDownloadURL()),
        tap(imageUrl => {
          console.log(imageUrl);
          console.log(this.urls);
          this.urls.push(imageUrl)
          this.urslLength();
        }),
        catchError(err => {
          console.log(err);
          this.keepTrying(10, filepath_original)
          return throwError(err)
        }),
        concatMap(() => this.storage.ref(filepath_200x200).getDownloadURL()),
        tap(imageUrl => {
          this.urls.push(imageUrl)
          this.urslLength();
        }),
        catchError(err => {
          this.keepTrying(10, filepath_200x200)
          return throwError(err)
        }),
        concatMap(() => this.storage.ref(filepath_320x320).getDownloadURL()),
        tap(imageUrl => {
          this.urls.push(imageUrl)
          this.urslLength();
        }),
        catchError(err => {
          console.log(err);
          this.keepTrying(10, filepath_320x320)
          return throwError(err)
        }),
        concatMap(() => this.storage.ref(filepath_430x430).getDownloadURL()),
        tap(imageUrl => {
          this.urls.push(imageUrl)
          this.urslLength();
        }),
        catchError(err => {
          console.log(err);
          this.keepTrying(10, filepath_430x430)
          return throwError(err)
        }),
        concatMap(() => this.storage.ref(filepath_640x640).getDownloadURL()),
        tap(imageUrl => {
          this.urls.push(imageUrl)
          this.urslLength();
        }),
        catchError(err => {
          console.log(err);
          this.keepTrying(10, filepath_640x640)
          return throwError(err)
        }),
        concatMap(() => this.storage.ref(filepath_1440x1440).getDownloadURL()),
        tap(imageUrl => {
          this.urls.push(imageUrl)
          this.urslLength();
        }),
        catchError(err => {
          this.keepTrying(10, filepath_1440x1440)
          return throwError(err)
        })
      )
      .subscribe();
  }


  private keepTrying(triesRemaining, filePath) {

    if (triesRemaining < 0) {
      return Promise.reject('out of tries')
    }
    const storageRef = this.storage.storage.ref().child(filePath);
    return storageRef.getDownloadURL()
      .then((imageUrl: string) => {
        this.urls.push(imageUrl)
        this.urslLength();
      }).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            return setTimeout(() => {
              return this.keepTrying(triesRemaining - 1, filePath)
            }, 2000);
          default: {
            return Promise.reject(error)
          }
        }
      })
  }

  private urslLength() {
    if (this.urls.length === 6) {
      this.urls.forEach((url: string) => {
        if (url.includes('_200x200')) {
          this.urlsObject._200x200 = url
        } else if (url.includes('_320x320')) {
          this.urlsObject._320x320 = url;
        } else if (url.includes('_430x430')) {
          this.urlsObject._430x430 = url;
        } else if (url.includes('_640x640')) {
          this.urlsObject._640x640 = url;
        } else if (url.includes('_1440x1440')) {
          this.urlsObject._1440x1440 = url
        } else {
          this.urlsObject._original = url
        }
      })
      this.store.dispatch(new STORAGE.FilePathsAndUrlsComplete(this.filePaths, this.urlsObject))
      this.urls = [];
      this.urlsObject = {
        _original: null,
        _200x200: null,
        _320x320: null,
        _430x430: null,
        _640x640: null,
        _1440x1440: null
      }
    }
  }

  private getStoredFilenames() {
    const storageRef = firebase.storage().ref()
    const listRef = storageRef.child('');
    return listRef.listAll()
      .then((res) => {
        const storageNames: string[] = []
        // return res
        console.log(res)
        res.items.forEach(item => {
          storageNames.push(item.name)
        })
        return storageNames
      })
      .catch(err => console.log(err));
  }

  // createFilepaths(filename) {
  //   const measurments: string[] = ['']
  //   const filepath_original = filename
  //   const filepath_200x200 = filename.split('.')[0] + '_200x200' + '.' + filename.split('.')[1]
  //   const filepath_320x320 = filename.split('.')[0] + '_320x320' + '.' + filename.split('.')[1]
  //   const filepath_640x640 = filename.split('.')[0] + '_640x640' + '.' + filename.split('.')[1]
  //   const filepath_1440x1440 = filename.split('.')[0] + '_1440x1440' + '.' + filename.split('.')[1]
  // }
}
