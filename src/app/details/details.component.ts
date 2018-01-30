import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../post-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  toDoArray;
  tableArray = [];
  total: number = 0;
  quartal: number;
  y; x; showY; out;

  public barChartLabels: string[] = [];//['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartData: any[] = [];
  public barChartType: string = 'horizontalBar';
  title;
  constructor(private postservice: PostDataService, private route: ActivatedRoute, private router: Router) {

    this.barChartType = this.postservice.getType();
    let rev = this.postservice.getReverse();
    if (rev == "h" && this.barChartType == "bar") this.barChartType = "horizontalBar";
    //  let f = this.postservice.getFilter();
    // this.title = "Результаты для "+f['post'];
  }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public ticks: { autoSkip: false };
  public barChartLegend: boolean = true;
  public chartClicked(e: any): void {
    console.log(e);
  }
 
  public options: {
    responsive: true,
  scaleShowValues: true,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0,         
          min: 0,
          beginAtZero: true,
        }
      }],
    xAxes: [{
        beginAtZero: true,
        bounds: 'ticks',
       ticks: {
          autoSkip: false,         
          suggestedMin: 0,
          min: 0,
          stepSize: 1,
        }
      }]
    }
  }
 

  ngOnInit() {
    var ctx = document.getElementById("myChart");

    var myChart = new Chart(ctx, {
      //  type: 'horizontalBar',   
      type: this.barChartType,
      data: {
        datasets: [
          {
            backgroundColor: "rgba(0,130,200,0.4)",

          }
        ]
      },
      options: {
        elements: {
          point: {
            radius: 0,
            hoverRadius: 0,
          }
        },
        legend: {
          display: true,
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            beginAtZero: true,
            suggestedMin:0,
            bounds: 'ticks',

            stacked: false,
            ticks: {
              autoSkip: false, // doesn't work
              min: 0,
              stepSize: 1,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMin: 0,
              callback: function (value, index, values) {
               return (value % 1 === 0) ? value : null;
              }
            }
          }]
        },
        tooltips: {
          enabled: false
        }
      }
    });



    //  const illness : string = this.route.snapshot.params['pathology'];
    //  this.toDoArray = this.postservice.getPathologyData(illness);
    this.total = this.postservice.getQueryTotal();
    console.log("total" + this.total);
    this.out = this.postservice.getOutput();
    this.showY = this.postservice.getshowY();
    this.toDoArray = this.postservice.getResultArr();
    this.toDoArray = this.toDoArray.sort(this.SortByNum);
    this.y = this.postservice.getParamY();
    if (this.showY == false) this.y = undefined;
    this.x = this.postservice.getParamX();
    let tmplabel = [];
    let tmp;
    //tmplabel - legenda; barChartLabel- labels;
    this.toDoArray.map((entry) => {
      this.barChartLabels.push(entry[this.x]);//' ex. medicin; X'

      tmplabel.push(entry[this.y]); //Y
    });
    this.barChartLabels = this.barChartLabels.filter((v, i, a) => a.indexOf(v) === i);//unique; X
    tmplabel = tmplabel.filter((v, i, a) => a.indexOf(v) === i); //'ex. post'

    tmplabel.map(

      (label) => {
        let data: any[] = [];
        this.barChartLabels.map((v, i) => { data[i] = 0; })
       
        this.toDoArray.map((entry) => {
          //label post; ex. terapevt
          if (label == entry[this.y]) {
            let ind = this.barChartLabels.indexOf(entry[this.x]);
            if (ind != -1) {
              data[ind] = entry['num'];

              if (this.out == "proc") data[ind] = ((data[ind] * 100) / this.total).toFixed(2);
            }
          }
        })

        if (label == undefined) label = "Результат";
        if (this.out == "rating") {
          //   let data1=[7,7,5,8,8,3];       

          let ratarr = [];
          //set rating
          let uniqarr = data.filter((v, i, a) => a.indexOf(v) === i && v!=0);
          let maxind = uniqarr.length;
          data.map((v, ind) => {
            if(v==0) return ratarr[ind]=0;
            if (uniqarr.includes(v)) {
              let i = uniqarr.indexOf(v);              
              return ratarr[ind] = maxind - i;
            }

          })
          data = ratarr;
          data.map((v, ind) => {
            let labX = this.barChartLabels[ind];

    //       this.toDoArray.filter(entry => {
    //          if (this.showY) {
    //           if (entry[this.x] == labX && entry[this.y] == label) { entry.num = maxind - v + 1; return true; }
    //            else return false;
    //         }
    //          else {
    //            if (entry[this.x] == labX) { entry.num = v; return true; }
    //            else return false;
    //          }
   //         })
   for (var i = 0; i < this.toDoArray.length; i++) {
    if( this.toDoArray[i][this.x]==labX &&( (this.toDoArray[i][this.y]==label && this.showY)||
  (this.showY==false ))) {
      this.toDoArray[i].num =  maxind - v + 1; 
      break;}
   }
   
              
      //        this.toDoArray.map( (entry)=>{             
       //        if(entry[this.x]==labX && entry[this.y]==label) {
       //           entry.num =  maxind - v + 1;
       //           return;}
       //        })

          }
          )
        }
        tmp = { 'data': data, 'label': label };
        this.barChartData.push(tmp);

      }
     
    )
    //sort by 'y' and number
    if (this.showY) {
      tmplabel.map(
        (legend) => {
          this.toDoArray.map(entry => {
            if (entry[this.y] == legend) { this.tableArray.push(entry) }
          })
        }
      )
    }
    else{this.tableArray = this.toDoArray}
  }


  SortByNum(x, y) {
    return y.num - x.num;
  }


  public chartHovered(e: any): void {
    console.log(e);
  }
  getXLabel(x) {
    if (x == "post") return "Профессия";
    if (x == "preparation") return "Препарат";
    if (x == "pathology") return "Патология";
    if (x == "region") return "Регион";
    if (x == "city") return "Город";
    if (x == "yq") return "Квартал";
    if (x == "year") return "Год";
  }
  getYLabel(y) {
    if (y == "post") return "Профессия";
    if (y == "preparation") return "Препарат";
    if (y == "pathology") return "Патология";
    if (y == "region") return "Регион";
    if (y == "city") return "Город";
    if (y == "yq") return "Квартал";
    if (y == "year") return "Год";
  }

  // public barChartData:any[] = [
  //  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  // ];
  Back() {
    this.router.navigate(["/"]);
  }

}
