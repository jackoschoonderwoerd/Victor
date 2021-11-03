import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { Artist } from './artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  artist: Artist;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  fetchArtists(): Observable<Artist[]> {
    return this.db
      .collection('artists',
        ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc: any) => {
            console.log(doc.payload.doc.data().name)
            return {
              artistId: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              instrument: doc.payload.doc.data().instrument,
              imageUrl: doc.payload.doc.data().imageUrl,
              biography: doc.payload.doc.data().biography,
              filePath: doc.payload.doc.data().filePath
            }
          })
        })
      )
  }

  fetchDocumentById(id) {
    
    this.db.collection('artists').doc(id).get().subscribe((snapshot) => {
      
      this.artist = {
        artistId: id,
        name: snapshot.get('name'),
        instrument: snapshot.get('instrument')
      } 
    })
    console.log(this.artist);
    return this.artist
  }

  fetchArtistById(id) {

    console.log(id);
    return this.db
      .collection('artists')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map(snaps => {
          const artist: Artist = {
            artistId: id,
            name : snaps.payload.get('name'),
            instrument: snaps.payload.get('instrument'),
            imageUrl: snaps.payload.get('imageUrl'),
            biography: snaps.payload.get('biography'),
            filePath: snaps.payload.get('filePath')
          }
          return artist
        }
        ),
        first()
      );
  }

  createArtist(artist: Artist): Observable<any> {
    console.log(artist)
    // artist.imageUrl = imageUrl;
    return from(this.db.collection('artists').add(artist))
  }
  
  updateArtist(artist: Artist): Observable<any> {
    console.log(artist)
    return from(this.db.doc(`artists/${artist.artistId}`).update(artist))
    // console.log(artist);
  }

  deleteArtist(artist: Artist) {
    console.log(artist);
    if(artist.filePath) {
      this.storage.storage.ref().child(artist.filePath).delete()
      .then(data => console.log(data));
    }
    return this.db.doc(`artists/${artist.artistId}`).delete();
  }
}
