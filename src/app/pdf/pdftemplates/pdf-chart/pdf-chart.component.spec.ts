/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdfChartComponent } from './pdf-chart.component';

describe('PdfChartComponent', () => {
  let component: PdfChartComponent;
  let fixture: ComponentFixture<PdfChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
