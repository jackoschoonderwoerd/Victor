







import { MatButtonModule } from "@angular/material/button";


import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from "@angular/material/input";
import { NgModule } from "@angular/core";

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';







@NgModule({
  imports: [
    
    MatButtonModule,
    MatFormFieldModule,
    
    
    
    MatInputModule,
    
    MatProgressSpinnerModule,
    
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,

    
    MatInputModule,
    
    MatProgressSpinnerModule,
    
  ]
})

export class AuthMaterialModule { }