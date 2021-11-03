import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsComponent } from './artists.component';
import { ArtistsRoutingModule } from './artists-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArtistsMaterialModule } from './artists-material.module';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ArtistsComponent,
    CreateArtistComponent
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    FlexLayoutModule,
    ArtistsMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    FontAwesomeModule
    
  ]
})
export class ArtistsModule { }
