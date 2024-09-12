import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import domtoimage from 'dom-to-image-more';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private pdf: any;
  myMap: Map<string, string> = new Map<string, string>();
  private totalPagesExp = '{total_pages_count_string}';
  fileCreatingSubject = new BehaviorSubject(true);
  private exportDomElementMap: Map<string, any> = new Map();
  pageNumberForPdf: any;

  formData: any;

  setData(data: any): void {
    this.formData = data;
  }

  getData(): any {
    return this.formData;
  }

  constructor() { }

  createPDF(): void {
    this.exportDomElementMap.set('pdfView', true);
    this.exportDomElementMap.set('chart', true);
    this.createMultiplePagesPdfDev(this.formData, this.exportDomElementMap)
  }

  // createPDF(): void {    
  //   this.pdf = new jsPDF('p', 'mm', 'a4');    
  //   this.pdf.setFontSize(12);

  //   // Convert HTML content to image using html2canvas
  //   const element = document.getElementById('pdfView') as HTMLElement;
  //   //this.pdf.html(element,)
  //   html2canvas(element).then((canvas) => {
  //     // this.setPdfPages(element, canvas);
  //     const imgData = canvas.toDataURL('image/jpeg');

  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;

  //     const maxWidth = 180;
  //     const maxHeight = 250;

  //     const ratio = Math.min(maxWidth/imgWidth);
  //     const pdfHeight = imgHeight * ratio;
  //     const pdfWidth = imgWidth * ratio;

  //     this.pdf.addImage(imgData, 'JPEG', 10, 20, pdfWidth, pdfHeight);
  //   });

  //   // Supply data via script
  //   var body = [
  //              ['SL.No', 'Product Name', 'Price', 'Model'],
  //              [1, 'I-phone', 75000, '2021'],
  //              [2, 'Realme', 25000, '2022'],
  //              [3, 'Oneplus', 30000, '2021'],
  //              ]
  //   // generate auto table with body
  //   var y = 1;
  //   this.pdf.setLineWidth(2);
  //   this.pdf.text(200, y, "Product detailed report");
  //   this.pdf.autoTable({
  //     body: body,
  //     startY: 70,
  //     theme: 'grid',
  //   });

  //   this.pdf.addPage();

  //   const chartElement = document.getElementById('chart') as HTMLElement;
  //   html2canvas(chartElement).then((canvas) => {

  //     // this.setPdfPages(chartElement, canvas)
  //     const imgData = canvas.toDataURL('image/jpeg');

  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;

  //     const maxWidth = 180;
  //     const maxHeight = 250;

  //     const ratio = Math.min(maxWidth/imgWidth);
  //     const pdfHeight = imgHeight * ratio;
  //     const pdfWidth = imgWidth * ratio;

  //     this.pdf.addImage(imgData, 'JPEG', 10, 20, pdfWidth, pdfHeight);
  //   });

  //   // Save PDF to browser
  //   //this.pdf.save('report.pdf');  
  // }

  // setPdfPages(quotes: HTMLElement, canvas: HTMLCanvasElement) {
  //   for (var i = 0; i <= quotes.clientHeight/980; i++) {
  //     //! This is all just html2canvas stuff
  //     var srcImg  = canvas;
  //     var sX      = 0;
  //     var sY      = 980*i; // start 980 pixels down for every new page
  //     var sWidth  = 900;
  //     var sHeight = 980;
  //     var dX      = 0;
  //     var dY      = 0;
  //     var dWidth  = 900;
  //     var dHeight = 980;

  //     let onePageCanvas = document.createElement("canvas");
  //     onePageCanvas.setAttribute('width', '900px');
  //     onePageCanvas.setAttribute('height', '980px');
  //     var ctx = onePageCanvas.getContext('2d');
  //     // details on this usage of this function: 
  //     // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
  //     if (ctx) {
  //       ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);
  //     }
      
  //     // document.body.appendChild(canvas);
  //     var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

  //     var width         = onePageCanvas.width;
  //     var height        = onePageCanvas.clientHeight;

  //     //! If we're on anything other than the first page,
  //     // add another page
  //     if (i > 0) {
  //         this.pdf.addPage(); //8.5" x 11" in pts (in*72)
  //     }
  //     //! now we declare that we're working on that page
  //     this.pdf.setPage(i+1);
  //     //! now we add content to that page!
  //     this.pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));
  //   }
  // }

  getPDF() : any {
    return this.pdf;
  }

  public createMultiplePagesPdfDev(pdfDetails: any, exportElementMap: Map<string, boolean>) {
    this.fileCreatingSubject.next(true);
    const orientation = 'p';
    const imageUnit = 'pt';
    const jsPdfOptions : any = {
      orientation: orientation,
      scale: 1,
      unit: imageUnit,
      hotfixes: ['px_scaling'],
    };

    this.pdf = new jsPDF(jsPdfOptions);
    this.pageNumberForPdf = 1;
    this.loadRequieredDomElemsForContent(exportElementMap, pdfDetails);

    const fileCreated = Promise.resolve()
      .then(async () => {
        if (exportElementMap.get('pdfView')) {
          await this.createPageForPdfView(
            this.formData,
            this.exportDomElementMap.get('pdfView')
          );
        }
        if (exportElementMap.get('chart')) {
          if (exportElementMap.get('chart')) {
            this.pdf.addPage();
            this.pageNumberForPdf++;
          }
          await this.createPagesForChartData(
            this.formData,
            this.exportDomElementMap.get('chart')
          );
        }

        // if (exportElementMap.get('timeOutOfRange')) {
        //   const startPageNumber = this.retrieveStartPageNumberForTimeOutOfRange(
        //     exportElementMap 
        //   );
        //   await this.createPagesForTimeOutOfRange(
        //     lraDetails,
        //     this.exportDomElementMap.get('timeOutOfRange'),
        //     startPageNumber
        //   );
        // }

        // if (exportElementMap.get('climate')) {
        //   const startPageNumber = this.retrieveStartPageNumberForClimate(
        //     exportElementMap 
        //   );
        
        //   await this.createPagesForClimate(
        //     lraDetails,
        //     this.exportDomElementMap.get('climate'), 
        //     startPageNumber);
        // }

        // if (exportElementMap.get('questionnaire')) {
        //   const startPageNumber = this.retrieveStartPageNumberForQuestionnaire(
        //     exportElementMap
        //   );
        //   this.createPagesForQuestionnaire(lraDetails, startPageNumber);
        // }

        // if (exportElementMap.get('mitigations')) {
        //   const keyValue = 'laneRiskAssessmentSectionTos';
        //   const keyValueMitigation = 'mitigationOverviewExcelExportTos';
        //   this.questionnaireDetailsForLra = this.lraPdfDetails[keyValue];

        //   if (this.lraPdfDetails[keyValueMitigation].length >= 0) {
        //     const startPageNumber = this.retrieveStartPageNumberForMitigation(
        //       exportElementMap
        //     );
        //     this.createPagesForMitigation(lraDetails, startPageNumber);
        //   }
        // }
        // if (exportElementMap.get('standardMitigations')) {
        //   if (mitigationData1.length >= 0) {
        //     const startPageNumber = this.retrieveStartPageNumberForMitigation(
        //       exportElementMap
        //     );
        //     this.createPagesForStandardMitigation(mitigationData1, startPageNumber);
        //   }
        // }
      })
      .then(async () => {
        this.fileCreatingSubject.next(true);

        // if (exportElementMap.get('customerSignoff')) {
        //   this.pdf.addPage();
        //   await this.createPageForCustomerSignoff(
        //     lraDetails,
        //     this.exportDomElementMap.get('customerSignoff')
        //   );
        // }
        // if(!exportElementMap.get('customerSignoff')){
        //   if (exportElementMap.get('knsignoff')) {
        //     this.pdf.addPage();
        //     await this.createPageForCustomerSignoff(
        //       lraDetails,
        //       this.exportDomElementMap.get('knsignoff')
        //     );
        //   }

        // }
        if (typeof this.pdf.putTotalPages === 'function') {
          this.pdf.putTotalPages(this.totalPagesExp);
        }
        // if (exportElementMap.get('temperatureDeviationHelpPage')) {
        //   this.pdf.addPage();
        //   await this.createPageForTempDeviationHelpPage(
        //     lraDetails,
        //     this.exportDomElementMap.get('temperatureDeviationHelpPage')
        //   );
        // }
      })
      .then(() => {
        const filename = 'report';
        this.pdf.save(filename + '.pdf');
        //this.totalPdfPages.next(true);
        //this.showDomElemHeaders();
        return true;
      })
      .catch((error) => {
        console.log(error)
        
        //this.showDomElemHeaders();
      });
    return fileCreated;
  }

  private async loadRequieredDomElemsForContent(exportElementMap: Map<string, boolean>, pdfDetails: any) {
    const contentToBeProcessed = [];
    try {
      
      if (exportElementMap.get('pdfView')) {
        const pdfViewContent = Promise.resolve().then(() => {
          this.exportDomElementMap.set(
            'pdfView',
            this.extractPdfViewDomElements()
          );
        });
        contentToBeProcessed.push(pdfViewContent);
      }
      if (exportElementMap.get('chart')) {
        const chartContent = Promise.resolve().then(() => {
          this.exportDomElementMap.set(
            'chart',
            this.extractChartDomElements()
          );
        });
        contentToBeProcessed.push(chartContent);
      }
      // if (exportElementMap.get('knsignoff')) {
      //   const knSignoffcontent = Promise.resolve().then(() => {
      //     this.exportDomElementMap.set(
      //       'knsignoff',
      //       this.extractCostumerSignoffDomElements()
      //     );
      //   });
      //   contentToBeProcessed.push(knSignoffcontent);
      // }
      
      // if (exportElementMap.get('riskscore')) {
      //   const riskscorecontent = Promise.resolve().then(() => {
      //     this.exportDomElementMap.set(
      //       'riskscore',
      //       this.extractRiskscoreDomElements()
      //     );
      //   });
      //   contentToBeProcessed.push(riskscorecontent);
      // }

      // if (exportElementMap.get('timeOutOfRange')) {
      //   const timeOutOfRangeContent = Promise.resolve().then(() => {
      //     this.exportDomElementMap.set(
      //       'timeOutOfRange',
      //       this.extractTimeOutOfRangeDomElements()
      //     );
      //   });
      //   contentToBeProcessed.push(timeOutOfRangeContent);
      // }

      // if (exportElementMap.get('climate')) {
      //   const climatecontent = Promise.resolve().then(() => {
      //     this.exportDomElementMap.set(
      //       'climate',
      //       this.extractClimateDataDomElements(lraDetails)
      //     );
      //   });
      //   contentToBeProcessed.push(climatecontent);
      // }
      // if (exportElementMap.get('temperatureDeviationHelpPage') && !this.isStandardLra) {
      //   const tempDeviation = Promise.resolve().then(() => {
      //     this.exportDomElementMap.set(
      //       'temperatureDeviationHelpPage',
      //       this.extractTempDeviationHelpPageDomElements()
      //     );
      //   });
      //   contentToBeProcessed.push(tempDeviation);
      // }
      const contentProcessed = await Promise.all(contentToBeProcessed);
      return contentProcessed;
    } catch (error) {
      console.log(error);
    } finally {
      return contentToBeProcessed;
    }
  }


  private async createPageForPdfView(pdfValues: any, elementsToImages: any) {
    try {
      const elementsPrint = await elementsToImages;
      const img = await elementsPrint.shift();
      const bufferX = 34;
      const bufferY = 20;
      const imgProps = this.pdf.getImageProperties(img);
      const pdfWidth = this.pdf.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      this.pdf.addImage(
        img,
        'PNG',
        bufferX,
        bufferY + 45,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      );
      this.addPageHeader('POC - Howdenre - PDF Generation');
      this.addSubtitle('PDF Sample View');
      this.addPageFooter();
      return 0;
    } catch (error) {
      throw new Error('Error capturing screenshot: ' + error);
    }
  }

  private async createPagesForChartData(pdfValues: any, elementsToImages: any) {
    try {
      const elementsPrint = await elementsToImages;
      const img = await elementsPrint.shift();
      const bufferX = 34;
      const bufferY = 20;
      const imgProps = this.pdf.getImageProperties(img);
      const pdfWidth = this.pdf.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      this.pdf.addImage(
        img,
        'PNG',
        bufferX,
        bufferY + 45,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      );
      this.addPageHeader('POC - Howdenre - PDF Generation');
      this.addSubtitle('Static Charts');
      this.addPageFooter();
      return 0;
    } catch (error) {
      throw new Error('Error capturing screenshot: ' + error);
    }
  }

  private addPageFooter() {
    // footer
    // this.pdf.setFontStyle('normal');
    this.pdf.setFont('times','normal');
    this.pdf.setFontSize(4);
    this.pdf.setTextColor('#000000');
    const pageSize = this.pdf.internal.pageSize;
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    
    this.pdf.text(
      'POC for PDF Download',
      62,
      pageHeight - 20
    );
   
    // this.pdf.setFontStyle('bold');
    this.pdf.setFont('times','bold');
    this.pdf.setFontSize(6);
    this.pdf.setTextColor('#000000');
    this.pdf.text(
        ' Page ' + this.pageNumberForPdf + ' of ' + this.totalPagesExp,
        300,
        pageHeight - 20
      );
    // this.pdf.setFontStyle('normal');
    // this.pdf.setFontSize(4);
    // this.pdf.setTextColor('#000000');

    
    this.pdf.setDrawColor('#013468');
    this.pdf.setLineWidth(0.8);
    this.pdf.line(62, 810, 532, 810);
  }

  private addPageHeader(title: string) {
    //this.pdf.setFontStyle('bold');
    this.pdf.setFont('times','bold');
    this.pdf.setFontSize(12);
    this.pdf.setTextColor('#003369');
    this.pdf.text(title, 57, 35);
    // this.pdf.addImage(
    //   this.loadImage('../../assets/howden-new_0.png'),
    //   'PNG',
    //   438.3,
    //   22,
    //   100,
    //   20
    // );
    // this.pdf.setFontStyle('normal');
    this.pdf.setFont('times','normal');
  }

  private addSubtitle(title: string) {
    //this.pdf.setFontStyle('bold');
    this.pdf.setFont('times','bold');
    this.pdf.setFontSize(9);
    this.pdf.setTextColor('#003369');
    this.pdf.text(title, 57, 45);
  }

  private extractPdfViewDomElements() {
    const elementsToImages = [];
    //this.hideDomElemHeaders();
    const temp = Promise.resolve().then(() =>
      this.domElementToImage('#pdfView', undefined)
    );
    elementsToImages.push(temp);
    return Promise.all(elementsToImages);
  }

  private extractChartDomElements() {
    const elementsToImages = [];
    //this.hideDomElemHeaders();
    const temp = Promise.resolve().then(() =>
      this.domElementToImage('#chart', undefined)
    );
    elementsToImages.push(temp);
    return Promise.all(elementsToImages);
  }

  

  private async domElementToImage(domElemID: string, options: any) {
    const node = document.querySelector(domElemID) as HTMLElement;
    const param = {
      width: node.offsetWidth,
      height: node.offsetHeight,
      quality: 1,
      bgcolor: 'white',
    };
    const img = await domtoimage.toJpeg(node, param);
    return img;
  }

  private loadImage(url: any) {
    const img = new Image();
    img.src = url;
    img.decode();
    return img;
  }

}
