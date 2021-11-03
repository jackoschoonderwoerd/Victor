import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-virus-warning',
  templateUrl: './virus-warning.component.html',
  styleUrls: ['./virus-warning.component.css']
})
export class VirusWarningComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('300px')
  }
}
