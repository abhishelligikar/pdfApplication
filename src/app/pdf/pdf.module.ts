import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { PdfoverviewComponent } from './pdfoverview/pdfoverview.component';
import { Template1Component } from './pdftemplates/template1/template1.component';
import { Template2Component } from './pdftemplates/template2/template2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { HighchartsChartModule } from 'highcharts-angular';
import { PdfChartComponent } from './pdftemplates/pdf-chart/pdf-chart.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    HighchartsChartModule
  ],
  declarations: [PdfComponent, PdfPreviewComponent, PdfoverviewComponent, Template1Component, Template2Component, PdfChartComponent],
  exports: [PdfPreviewComponent, PdfoverviewComponent, Template1Component, Template2Component, PdfChartComponent]
})
export class PdfModule { }
