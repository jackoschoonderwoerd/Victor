import { NgModule } from "@angular/core";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from "@angular/material/button";


import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from "@angular/material/dialog";





@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,


    MatCheckboxModule,

    MatIconModule,
    MatProgressBarModule,


  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,


    MatCheckboxModule,

    MatIconModule,
    MatProgressBarModule,
  ]
})

export class ArtistsMaterialModule { }