import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-prototype-page',
  templateUrl: './dialog-prototype-page.component.html',
  styleUrls: ['./dialog-prototype-page.component.css']
})
export class DialogPrototypePageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPrototypePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dataLink: string}
  ) { }

  ngOnInit(): void {
  }

}
