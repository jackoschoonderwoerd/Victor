import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { UploadImageComponent } from './../gallery/upload-image/upload-image.component';
import { GalleryMaterialModule } from './gallery-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmOverwriteComponent } from './upload-image/confirm-overwrite/confirm-overwrite.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShowDetailComponent } from './show-detail/show-detail.component';



@NgModule({
  declarations: [
    GalleryComponent,
    UploadImageComponent,
    ConfirmOverwriteComponent,
    EditComponent,
    InfoComponent,
    ShowDetailComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    GalleryMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class GalleryModule { }
