import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.initForm()
  }
  initForm() {
    this.form = this.fb.group({
      title: new FormControl(this.data.title, Validators.required),
      caption: new FormControl(this.data.caption, Validators.required),
      price: new FormControl(this.data.price, Validators.required),
      listPosition: new FormControl(this.data.listPosition, Validators.required)
    })
  }

}
