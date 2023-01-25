import { Component, OnInit, Inject, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-video',
  templateUrl: './dialog-video.component.html',
  styleUrls: ['./dialog-video.component.css']
})
export class DialogVideoComponent implements OnInit {

  @ViewChild('dialogContainer', {static: true, read: ViewContainerRef}) dialogContainer: ViewContainerRef | undefined;
  @ViewChild('dialogVideo', {static: true}) dialogVideoTemplate: TemplateRef<any> | undefined;
  @ViewChild('dialogImage', {static: true}) dialogImageTemplate: TemplateRef<any> | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {url: string, idDialog: string}
  ) { }

  ngOnInit(): void {
    this.selectTemplate(this.data.idDialog);
  }

  selectTemplate(idDialog: string): void {
    switch (idDialog) {
      case 'cv_page1':
      case 'cv_page2':
        this.dialogContainer?.createEmbeddedView(this.dialogImageTemplate!);
        break;
      case 'cv_images':
        this.dialogContainer?.createEmbeddedView(this.dialogVideoTemplate!);
        break;
    }
  }

}
