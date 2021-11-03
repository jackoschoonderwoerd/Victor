import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  height: string = "100px"

  constructor() { }

  ngOnInit(): void {
    this.height=document.documentElement.clientHeight.toString()
  }


}
