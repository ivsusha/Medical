import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    tooltips: {
      enabled: true,
      callbacks: {
        label: function (tooltipItems, data) {
          var i, label = [], l = data.datasets.length;
          let d1;let uniqarr1;
        let  uniqarr=[];
       //   for (i = 0; i < l; i += 1) {
        let datasetind= tooltipItems.datasetIndex;
        uniqarr1 = data.datasets[datasetind].data.filter((v, i, a) => a.indexOf(v) === i && v!=0);
        d1=data.datasets[datasetind].data[tooltipItems.index];
        let r1 =(uniqarr1.indexOf(d1))+1;
        return (data.datasets[datasetind].data[tooltipItems.index]+". Рейтинг "+ r1);
       //return tooltipItems.labely+"Рейтинг "+ r1;

         },
         }     
}
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2014', '2015', '2016,20018', '20072', '20082', '20092', '20102', '20112', '20122'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 80, 80, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 27,27, 59, 80, 81, 56, 55, 40], label: 'Series B'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
