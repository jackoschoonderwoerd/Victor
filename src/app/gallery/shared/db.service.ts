import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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



  getImages(): Observable<any> {
    return this.db.collection('victor')
    // .valueChanges()
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map((doc: any) => {
          return {
            id: doc.payload.doc.id,
            title: doc.payload.doc.data().title,
            caption: doc.payload.doc.data().caption,
            price: doc.payload.doc.data().price,
            urls: doc.payload.doc.data().urls,
            filepaths: doc.payload.doc.data().filepaths
          }
        })
      })
    )
    
    // return this.data
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
          console.log(docArray)
          return docArray.map((doc: any) => {
            console.log(doc.payload.doc.data().title)
          })
        })
      ).subscribe(data => console.log(data))

  }
}
