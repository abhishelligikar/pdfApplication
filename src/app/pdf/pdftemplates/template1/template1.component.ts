import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../../services/pdf.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {

  pdf: any;

  constructor(private pdfService: PdfService,
    public dialogRef: MatDialogRef<Template1Component>
  ) {}

  ngOnInit() {
    // this.generatePDF();
  }

  generatePDF(): void {
    let htmlContent = document.getElementById('pdfView');
    this.pdfService.createPDF(htmlContent ? htmlContent.innerHTML : '');
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
