import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';

import { AuthGuard } from './auth/auth-guard';
import { AuthAdminGuard } from './auth/auth-admin.guard';
import { FooterComponent } from './navigation/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { MaterialModule } from './material.module';
import { AppMaterialModule } from './app-material.module';
import { DateSuffix } from './shared/date-suffix.pipe';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { EventsComponent } from './events/events.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    ConfirmDeleteComponent,
    ShowcaseComponent,
    EventsComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    // MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    AuthModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    AppMaterialModule
  ],
  
  providers: [AuthGuard, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
