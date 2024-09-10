import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pdfoverview',
  templateUrl: './pdfoverview.component.html',
  styleUrls: ['./pdfoverview.component.css']
})
export class PdfoverviewComponent implements OnInit {

  pdfForm = new FormGroup({
    name: new FormControl("", []),
    placeholder1: new FormControl("", []),
    placeholder2: new FormControl("", []),
    templateChoosen: new FormControl("", [])
  });

  formValues: any = {
    name: '',
    placeholder1: '',
    placeholder2: '',
    templateChoosen: ''
  };

  lstTemplates = ['template1', 'template2'];
  template: any;


  constructor(private pdfService: PdfService) {}

  ngOnInit() {
    // this.generatePDF();
  }

  onSubmit() {
    this.formValues = this.pdfForm.value;
    console.log(this.formValues);
  }

}
