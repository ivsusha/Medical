import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], criteria:any): any {
    let tmp =[];
    let y1=1000; let q1=1;let y2=3000;let q2=4;
    
    if(criteria.post!=undefined && criteria.post!=""  ) tmp.push('post');
   if(criteria.region!=undefined && criteria.region!="") tmp.push('region');
    if(criteria.city!=undefined && criteria.city!="" ) tmp.push('city');
     let arr=[];
     let patarr=[];
    
     if(criteria.year1 !=undefined && criteria.year!="") y1= criteria.year1;
     if(criteria.quartal1 !=undefined && criteria.quartal!="") q1= criteria.quartal1;
     if(criteria.year2 !=undefined && criteria.year2!="") y2= criteria.year2;
     if(criteria.quartal2 !=undefined && criteria.quartal2!="") q2= criteria.quartal2;
   arr= items.filter(item => {
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
    //   if(arr.includes(item['pathology'])) return false;
      if(bOk==true) return true;
      else return false;
     //  if(criteria['post'].includes.item['post']){
     //    console.log(item['post'] +";"+ item['pathology']);
       //  return arr.push(item['pathology']);      
  //     }
    });
    arr.map(v=>{patarr.push(v['pathology'])});
     patarr = patarr.filter((v, i, a) => a.indexOf(v) === i);
    return patarr;
}
 

}
