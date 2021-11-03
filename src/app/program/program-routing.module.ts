import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { HomeComponent } from '../home/home.component';
import { BookArtistComponent } from './book-artist/book-artist.component';

import { ProgramComponent } from './program.component';
import { ShowcaseComponent } from './showcase/showcase.component';



const routes: Routes = [
  { path: '', component: ProgramComponent },
  { path: 'book-artist', component: BookArtistComponent, canActivate: [AuthGuard]},
  { path: 'showcase', component: ShowcaseComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
