import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';




const routes: Routes = [
  { path: '', redirectTo: 'program', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'gallery', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)},
  
  
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
