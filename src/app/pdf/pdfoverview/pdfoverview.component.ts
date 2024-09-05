import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdfoverview',
  templateUrl: './pdfoverview.component.html',
  styleUrls: ['./pdfoverview.component.css']
})
export class PdfoverviewComponent implements OnInit {

  pdf: any;

  constructor(private pdfService: PdfService) {}

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
}
