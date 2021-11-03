import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';

import { GalleryComponent } from './gallery.component';
import { UploadImageComponent } from './upload-image/upload-image.component';




const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'upload-image', component: UploadImageComponent }
  // { path: 'create-artist', component: CreateArtistComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
