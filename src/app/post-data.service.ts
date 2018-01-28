import { Injectable } from '@angular/core';

@Injectable()
export class PostDataService {
 queryArray:any[]=[];
 resultArr:any[]=[];
 todoArray:any[]=[];
 paramX ="";
 paramY= "";
 type ="bar";
 showY;
 output="proc";
 reverse= "h"; 
 filter=[];
 total :number = 0;
  constructor() { }

setQueryArray(arr){this.queryArray = arr; }
getQueryArray(){
  return this.queryArray;
}
getQueryTotal(){return this.queryArray.length;}
setResultArray(arr){this.resultArr = arr;}
getResultArr(){return this.resultArr; }

transform(items: any[], criteria:any): any {
  let tmp =[];
  let y1=1000; let q1=1;let y2=3000;let q2=4;
  if(criteria.post!=undefined && criteria.post!=""  ) tmp.push('post');
 if(criteria.region!=undefined && criteria.region!="") tmp.push('region');
  if(criteria.city!=undefined && criteria.city!="" ) tmp.push('city');
  if(criteria.pathology!=undefined && criteria.pathology!="" ) tmp.push('pathology');
  if(criteria.preparation!=undefined && criteria.preparation!="" ) tmp.push('preparation');
   let arr=[];
   let patarr=[];
   if(criteria.year1 !=undefined && criteria.year!="") y1= criteria.year1;
   if(criteria.quartal1 !=undefined && criteria.quartal!="") q1= criteria.quartal1;
   if(criteria.year2 !=undefined && criteria.year2!="") y2= criteria.year2;
   if(criteria.quartal2 !=undefined && criteria.quartal2!="") q2= criteria.quartal2;
 return items.filter(item => {    
  let bOk= true;
  if(item.year>= y1 && item.quartal>=q1 && item.year<= y2  ){
    if(item.year>= y2 && item.quartal> q2 ) return false;
    bOk = true;
 } 
         else return false;       
     tmp.map(key=>{     
       if(criteria[key].includes(item[key])== false){
        bOk= false;
        return false;
       
       } 
     
     }); 
    if(bOk==true) return true;
    else return false;
   //  if(criteria['post'].includes.item['post']){
   //    console.log(item['post'] +";"+ item['pathology']);
     //  return arr.push(item['pathology']);      
//     }
  });
 
}
saveFilter(region,city,post,y1,q1,y2,q2,pathology,preparation){
this.filter['region']= region;
this.filter['city']= city;
this.filter['post']= post;
this.filter['y1']= y1;
this.filter['q1']= q1;
this.filter['y2']= y2;
this.filter['q2']= q2;
this.filter['pathology']= pathology;
this.filter['preparation']= preparation;
}
getFilter(){return this.filter};
setParamsXY(x,y,output,type,showY,reverse){
  this.paramX = x;
  this.paramY = y;
  this.output = output;
  this.type = type;
  this.showY = showY;
  this.reverse = reverse;
}
getParamX(){return this.paramX };
getParamY(){
  if(this.showY==false) this.paramY =undefined;
  return this.paramY };
getOutput(){ return this.output };
getType(){  return this.type};
getReverse(){return this.reverse};
setReverse(reverse){
  this.reverse = reverse;
}
getshowY(){return this.showY};
getYear(item){
  return  item.substr(0,4);
  
}
getQuartal(item){
  let m= item.substr(5,2);
  if(m<4) return 1;
  else if(m < 7) return 2;
  else if(m < 10)return 3; 
  else  return 4;
}


getTotal(){return this.total}

}
