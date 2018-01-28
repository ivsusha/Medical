import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostDataService } from '../post-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent implements OnInit {
regionY = false;
cityY = true;
postY = false;
resultArr :any[]=[];
  constructor(private postservice: PostDataService, private router: Router) { }

  ngOnInit() {  }
onChart(paramX,paramY,output,type,showY,reverse){
 if(paramY == undefined)this.setResultX( this.postservice.getQueryArray(),paramX,paramY);
 else this.setResult( this.postservice.getQueryArray(),paramX,paramY);
  this.postservice.setResultArray(this.resultArr); 
  this.postservice.setParamsXY(paramX,paramY,output,type,showY,reverse);
  this.router.navigate(['/details']);

}
setResult(items: any[], criteria1: any,criteria2: any): any {
  let bInclude = false;
  return items.filter(item => {
      if(criteria1 == undefined || criteria1=="") return false;
     
      bInclude = false;
     
       for(var i=0; i<this.resultArr.length;i++){         
         if(this.resultArr[i][criteria1] == item[criteria1] && this.resultArr[i][criteria2] == item[criteria2]) {
          this.resultArr[i]['num'] += 1;
          bInclude = true;
          return true;
         }
       }
     //   this.resultArr.map((v,ind)=>{if(v[criteria1]==item[criteria1]){
    //       this.resultArr[ind]['num'] += 1;return true;
     //    } })
      
        
      if(bInclude== false) {
        let arrj: any[]=[];
      //  let arrj:{criteria1:string,criteria2:string,"num":number}={criteria1:"",criteria2:"","num":1};
        arrj[criteria1] =  item[criteria1];
        arrj[criteria2] =  item[criteria2];
        arrj['num'] = 1;
      (this.resultArr).push(arrj);
          
      } 

  }); 
}
setResultX(items: any[], criteria1: any,criteria2: any): any {
  let bInclude = false;
  return items.filter(item => {
      if(criteria1 == undefined || criteria1=="") return false;
     
      bInclude = false;
     
       for(var i=0; i<this.resultArr.length;i++){         
         if(this.resultArr[i][criteria1] == item[criteria1] ) {
          this.resultArr[i]['num'] += 1;
          bInclude = true;
          return true;
         }
       }
     
      if(bInclude== false) {
        let arrj: any[]=[];
      //  let arrj:{criteria1:string,criteria2:string,"num":number}={criteria1:"",criteria2:"","num":1};
        arrj[criteria1] =  item[criteria1];
        arrj["x"] = "x"; //item[criteria2];
        arrj['num'] = 1;
      (this.resultArr).push(arrj);
          
      } 

  });
 
}
}
