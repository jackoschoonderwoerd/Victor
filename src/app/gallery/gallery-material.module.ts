import { NgModule } from "@angular/core";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from "@angular/material/button";


import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";





@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,


    MatCheckboxModule,

    MatIconModule,
    MatProgressBarModule,


  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,

    MatCheckboxModule,

    MatIconModule,
    MatProgressBarModule,
  ]
})

export class GalleryMaterialModule { }