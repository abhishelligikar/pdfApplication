import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-pdf-chart',
  templateUrl: './pdf-chart.component.html',
  styleUrls: ['./pdf-chart.component.css']
})
export class PdfChartComponent implements OnInit {

  highcharts: typeof Highcharts = Highcharts;
  columnChartOptions: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Chart Title'
    },
    xAxis: {
      categories: ['Category 1', 'Category 2', 'Category 3']
    },
    yAxis: {
      title: {
        text: 'Y Axis Title'
      }
    },
    series: [
      {
        name: 'Series 1',
        data: [10, 20, 30]
      }
    ]
  };

  lineChartOptions: any = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Line Chart'
    },
    xAxis: {
      categories: ['Category 1', 'Category 2', 'Category 3']
    },
    yAxis: {
      title: {
        text: 'Y Axis Title'
      }
    },
    series: [
      {
        name: 'Series 1',
        data: [10, 20, 30]
      }
    ]
  };

  barChartOptions: any = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Bar Chart'
    },
    xAxis: {
      categories: ['Category 1', 'Category 2', 'Category 3']
    },
    yAxis: {
      title: {
        text: 'Y Axis Title'
      }
    },
    series: [
      {
        name: 'Series 1',
        data: [10, 20, 30]
      }
    ]
  };

  pieChartOptions: any = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Pie Chart'
    },
    series: [
      {
        name: 'Series 1',
        data: [10, 20, 30]
      }
    ]
  };
  
  constructor() { }

  ngOnInit() {
  }

}
