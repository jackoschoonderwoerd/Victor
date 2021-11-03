import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';



const routes: Routes = [
  { path: '', redirectTo: 'program', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'gallery', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)},
  { path: 'location', component: LocationComponent },
  { path: 'program', loadChildren: () => import('./program/program.module').then (m => m.ProgramModule)},
  { path: 'artists', loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsModule), canLoad: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
