import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { PdfoverviewComponent } from './pdfoverview/pdfoverview.component';
import { Template1Component } from './pdftemplates/template1/template1.component';
import { Template2Component } from './pdftemplates/template2/template2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PdfComponent, PdfPreviewComponent, PdfoverviewComponent, Template1Component, Template2Component],
  exports: [PdfPreviewComponent, PdfoverviewComponent, Template1Component, Template2Component]
})
export class PdfModule { }
