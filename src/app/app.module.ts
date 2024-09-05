import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfModule } from './pdf/pdf.module';
import { PdfoverviewComponent } from './pdf/pdfoverview/pdfoverview.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfoverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
