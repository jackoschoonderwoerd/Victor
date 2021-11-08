import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { ArtWork } from './models/artwork.model';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  data: any;

  constructor(
    private db: AngularFirestore
  ) { }

  storeImageDataInDb(artwork: ArtWork) {
    console.log(artwork);
    return this.db.collection('victor').add(artwork);
  }
  deleteImageDataFromDb(artWorkId: string) {
    console.log(artWorkId);
    return this.db.collection('victor').doc(artWorkId).delete()
  }

  editImageDataInDB(artWork: ArtWork) {
    console.log(artWork);
    return this.db.doc(`victor/${artWork.id}`).update(artWork)
  }

  deleteDocumentByFilePath(filePath: string) {
    console.log(filePath);
    const documentRef = this.db.collection('victor')
    const doomedDocument = this.db.collection('victor', ref => ref.where('originalFilePath', '==', filePath))
    doomedDocument
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map((doc: any) => {
          return {
            id: doc.payload.doc.id
          }
        })
      })
    ).subscribe((idObject: any) => {
      console.log(idObject);
      if(idObject.length !== 0) {
        const id = (idObject[0].id);
        this.db.collection('victor').doc(id).delete();
      }
    })
  }

  getImages(): Observable<any> {
    return this.db.collection('victor', ref => ref.orderBy('listPosition'))
    // .valueChanges()
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map((doc: any) => {
          return {
            id: doc.payload.doc.id,
            title: doc.payload.doc.data().title,
            yearCreated: doc.payload.doc.data().yearCreated,
            width: doc.payload.doc.data().width,
            height: doc.payload.doc.data().height,
            bearer: doc.payload.doc.data().bearer,
            medium: doc.payload.doc.data().medium,
            caption: doc.payload.doc.data().caption,
            price: doc.payload.doc.data().price,
            listPosition: doc.payload.doc.data().listPosition,
            urls: doc.payload.doc.data().urls,
            filepaths: doc.payload.doc.data().filepaths
          }
        })
      })
    )
  }

  checkTitleAvailable(title: string) {
    console.log(title);
    const titles = this.getTitles();
  }

  private getTitles() {
    this.db.collection('victor')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc: any) => {
            console.log(doc.payload.doc.data().title)
          })
        })
      ).subscribe(data => console.log(data))
  }

  getAllfilepaths() {
    const allFilepaths: string[] = []
    return this.db.collection('victor')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          docArray.map((doc: any) => {
            doc.payload.doc.data().filepaths.forEach((path: string) => {
              allFilepaths.push(path)
            })
            
          })
          return allFilepaths;
        })
      )
  } 
}
