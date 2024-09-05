import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private pdf: any;

  constructor() { }

  createPDF(htmlContent: string): void {    
    this.pdf = new jsPDF('p', 'mm', 'a4');    
    this.pdf.setFontSize(12);

    // Convert HTML content to image using jspdf-autotable
    const element = document.getElementById('pdfView') as HTMLElement;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      this.pdf.addImage(imgData, 'JPEG', 10, 20, 150, 200);
    });

    // Save PDF to browser
    //this.pdf.save('report.pdf');  
  }

  getPDF() : any {
    return this.pdf;
  }

}
