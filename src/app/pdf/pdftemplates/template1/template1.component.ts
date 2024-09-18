import { Component, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { PdfService } from '../../../services/pdf.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit, OnChanges {
  @Input() pdfFormValues: any;
  pdf: any;
  pdfValues = {
    displaytype: '',
    name: '',
    placeholder1: '',
    placeholder2: ''
  }

  constructor(private pdfService: PdfService,
    @Optional() public dialogRef: MatDialogRef<Template1Component>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.pdfFormValues = changes; 

    if (this.dialogRef && this.pdfFormValues.pdfFormValues.currentValue.displaytype !== 'inline') {
      this.dialogRef.close();
    }

    this.pdfValues = this.pdfFormValues.pdfFormValues.currentValue;
  }

  ngOnInit() {
    this.pdfValues = this.data ? this.data : this.pdfFormValues.pdfFormValues.currentValue;
  }

  generatePDF(): void {
    // let htmlContent = document.getElementById('pdfView');
    this.pdfService.createPDF();
    // this.pdfService.createPDF(this.htmlContent);
    this.pdf = this.pdfService.getPDF();
  }

  downloadPDF(): void {
    const pdf = this.pdf;
    const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report.pdf';
    link.click();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
