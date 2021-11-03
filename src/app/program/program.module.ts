import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
// import { ProgramMaterialModule } from '../app-material.module';
import { NumberToMonth } from './number-to-month.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookArtistComponent } from './book-artist/book-artist.component';
import { ProgramMaterialModule } from './program-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowcaseComponent } from './showcase/showcase.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NameTitlecase } from './name-titlecase.pipe';
import { DateSuffix } from '../shared/date-suffix.pipe';








@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule,
    ProgramMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  declarations: [
    ProgramComponent,
    BookArtistComponent,
    NumberToMonth,
    ShowcaseComponent,
    NameTitlecase,
    DateSuffix
    
    
  ],
})
export class ProgramModule { }
