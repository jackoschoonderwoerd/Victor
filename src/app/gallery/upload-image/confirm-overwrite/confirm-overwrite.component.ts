import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-overwrite',
  templateUrl: './confirm-overwrite.component.html',
  styleUrls: ['./confirm-overwrite.component.css']
})
export class ConfirmOverwriteComponent implements OnInit {

  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.message = this.data.message
  }

}
