import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdfoverview',
  templateUrl: './pdfoverview.component.html',
  styleUrls: ['./pdfoverview.component.css']
})
export class PdfoverviewComponent implements OnInit {

  formValues: any = {
    name: '',
    email: '',
    phone: '',
    templateChoosen: ''
  };

  constructor(private pdfService: PdfService) {}

  ngOnInit() {
    // this.generatePDF();
  }

  onChange(event: any): void {
    this.formValues[event.target.name] = event.target.value;
  }

}
