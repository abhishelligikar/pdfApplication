import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import jsPDF from 'jspdf';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Template1Component } from '../pdftemplates/template1/template1.component';
import { Template2Component } from '../pdftemplates/template2/template2.component';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.css']
})
export class PdfPreviewComponent implements OnInit, OnChanges {
  @Input() pdfFormValues: any;
  pdfDoc = {
    content: []
  };

  constructor(public dialogRef: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.openDialog();
  }

  ngOnInit() {
    console.log(this.pdfFormValues);
    if (this.pdfFormValues.templateChoosen !== '') {
      this.openDialog();
    }
    
  }

  
  openDialog(): void {
    let dialogRef;
    if (this.pdfFormValues.templateChoosen === 'template1') {
      dialogRef = this.dialogRef.open(Template1Component, {
        hasBackdrop: false,
        width: '857px',
        height: '800px',
        position: { right: '350px', left: '350px', top: '-250px'},
        data: { name: this.pdfFormValues.name, placeholder1: this.pdfFormValues.placeholder1, placeholder2: this.pdfFormValues.placeholder2 }
      });
    } 
    if (this.pdfFormValues.templateChoosen === 'template2') {
      dialogRef = this.dialogRef.open(Template2Component, {
        hasBackdrop: false,
        width: '857px',
        height: '800px',
        position: { right: '350px', left: '350px', top: '-250px'},
        data: { name: this.pdfFormValues.name, placeholder1: this.pdfFormValues.placeholder1, placeholder2: this.pdfFormValues.placeholder2 }
      });
    } 

    if (dialogRef) {
      dialogRef.afterClosed().subscribe(() => {
        console.log(this.pdfFormValues.templateChoosen + ' dialog was closed');
      });
    }
    
  }

  generatePdf() {

  }

  downloadPdf() {
    
  }

  onCancel() {
    this.dialogRef.closeAll();
  }

  
}
