import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UrlObject } from 'url';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {

  urls: UrlObject;
  closeUp: boolean = false;
  windowCloseVisible = false;
  faWindowClose = faWindowClose;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove() {
    // console.log(e);
    this.windowCloseVisible = true;
    this.hideWindowClose()
    return true;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<any>

  ) { }

  ngOnInit(): void {
    this.urls = this.data.urls;
    console.log(this.urls);
    this.dialogRef.updateSize('100vh', '100vh')
    // console.log(this.data)

  }
  onToggleCloseUp() {
    this.closeUp = !this.closeUp
    // if(this.closeUp) {
    //   this.closeUp = !this.closeUp;
    //   // this.dialogRef.updateSize('100%', '100%')  
    //   // this.dialogRef.updateSize('70vw', '70vw')  
    // } else {
    //   this.closeUp = !this.closeUp;
    //   // this.dialogRef.updateSize('70vw', '70vw')
    // }
  }
  hideWindowClose () {
    setTimeout(() => {
      this.windowCloseVisible = false
    }, 2000);
  }
}
