import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Template1Component } from '../pdftemplates/template1/template1.component';
import { Template2Component } from '../pdftemplates/template2/template2.component';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.css']
})
export class PdfPreviewComponent implements OnInit {

  formValues = {
    name: '',
    email: '',
    phone: '',
    templateChoosen: ''
  };

  pdfDoc = {
    content: []
  };

  constructor(public dialogRef: MatDialog) { }

  ngOnInit() {
  }

  
  openDialog(): void {
    let dialogRef;
    if (this.formValues.templateChoosen === 'template1') {
      dialogRef = this.dialogRef.open(Template1Component, {
        width: '250px',
        data: { name: this.formValues.name, email: this.formValues.email, phone: this.formValues.phone }
      });
    } else {
      dialogRef = this.dialogRef.open(Template2Component, {
        width: '250px',
        data: { name: this.formValues.name, email: this.formValues.email, phone: this.formValues.phone }
      });
    }

    dialogRef.afterClosed().subscribe(() => {
      console.log(this.formValues.templateChoosen + ' dialog was closed');
    });
  }

  generatePdf() {

  }

  downloadPdf() {
    
  }

  
}
