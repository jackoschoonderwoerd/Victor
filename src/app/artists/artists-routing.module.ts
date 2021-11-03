import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { ArtistsComponent } from './artists.component';
import { CreateArtistComponent } from './create-artist/create-artist.component';




const routes: Routes = [
  { path: '', component: ArtistsComponent, canActivate: [AuthGuard] },
  { path: 'create-artist', component: CreateArtistComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule { }
