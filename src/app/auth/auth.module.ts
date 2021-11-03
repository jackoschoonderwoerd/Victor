import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';


import { AngularFireAuthModule } from '@angular/fire/auth'

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { AuthMaterialModule } from './auth-material.module';




@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    AppMaterialModule,
    AuthMaterialModule
  ]
})
export class AuthModule { }
