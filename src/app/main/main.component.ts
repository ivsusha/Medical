import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

//import 'rxjs/add/operator/map';
import { PostDataService } from '../post-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {  
 mainArray;
  queryArray: { "region": string,"post": any, "pathology": any, "preparation": any, 
  'year': string, 'quartal' : string}[] = [];
  filterArray: { "region": string,"city":string,"post": any, "pathology": any, "preparation": any,
  'year': string, 'quartal' : string}[] = [];
  post: any[] = [];
  mylistarr: {id:string,name:string}[] = [];
  
  region: any[] = [];
  city: any[] = [];
  pathology: any[] = [];
  preparation: any[] = [];
  mySearch = "терапевт"; 
  myRegion = "Минск";
  forYear1;
  forQuartal1:any[] = [];
  forYear2;
  forQuartal2:any[] = [];;
  year: any[] = [];
 
  regionY = false;
cityY = true;
postY = false;
resultArr :any[]=[];
filter=[];
paramX;paramY;output;type;showY;reverse;
  constructor(private mservice: MainService, private postservice: PostDataService,private router: Router) {
    let dat = new Date();
    this.year[0] = dat.getFullYear() - 1;
    this.year[1] = dat.getFullYear();
   
    this.type =this.postservice.getType();
    this.paramX = this.postservice.getParamX();
    this.paramY = this.postservice.getParamY();
    this.showY = this.postservice.getshowY();
    this.output = this.postservice.getOutput();
    this.reverse = this.postservice.getReverse();
  }
  //myOptions: IMultiSelectOption[];
  myCityModel:string[];
  myRegionModel:string[];
  mypostModel:string[];
  myqModelSt :number[];
  myqModelEnd :number[];
  myPatModel: string[];
  myPrepModel: string[];
  myPostOptions: IMultiSelectOption[]=[];
  myQuartals: IMultiSelectOption[];
  myPatOptions: IMultiSelectOption[]=[];
  myPrepOptions: IMultiSelectOption[]=[];
  myRegionOptions: IMultiSelectOption[]=[];
  myCityOptions: IMultiSelectOption[]=[];
  multiListSet:  IMultiSelectSettings = {
  //  checkedStyle: 'fontawesome', 
    buttonClasses: 'btn btn-default btn-secondary',
    dynamicTitleMaxItems: 3,
   // displayAllSelectedText: true
  }
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Очистить',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Найти',
    searchEmptyResult: 'Ничего не найдено...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Ввод' ,
    allSelected: 'All selected',
};
  mySettings: IMultiSelectSettings = {
  //  enableSearch: true,  
    checkedStyle: 'fontawesome',
  //  buttonClasses: 'btn btn-default btn-block',
    buttonClasses: 'btn btn-default btn-secondary',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true,
    selectionLimit: 1,
  autoUnselect: true,
  closeOnSelect:true
};
mySettings2: IMultiSelectSettings = {
  pullRight: false,
  enableSearch: true,
  checkedStyle: 'checkboxes',
  buttonClasses: 'btn btn-default btn-secondary',
  selectionLimit: 0,
  closeOnSelect: false,
  autoUnselect: false,
  showCheckAll: false,
  showUncheckAll: true,
  fixedTitle: true,
  dynamicTitleMaxItems: 3,
  maxHeight: '300px',
 // isLazyLoad: true,
  loadViewDistance: 1,
  stopScrollPropagation: true,
  selectAddedValues: true
};
  ngOnInit() {    
    this.filter = this.postservice.getFilter(); 
    this.myCityModel = this.filter['city'];
  this.myRegionModel = this.filter['region'];
    this.mypostModel = this.filter['post'];
    this.myqModelSt = this.filter['q1'];
 this.myqModelEnd = this.filter['q2'];
 this.forYear1 = this.filter['y1'];
 this.forYear2 = this.filter['y2'];
 this.myPatModel=this.filter['pathology']; 
 this.myPrepModel=this.filter['preparation']; 
      this.myQuartals = [{ id: 1, name: '1' },{ id: 2, name: '2' },{ id: 3, name: '3' },{ id: 4, name: '4' }]; 
   this.mainArray = this.mservice.getMainArray();
   if( this.mainArray == undefined){
    this.mservice.readJson().subscribe(
      (response: Response) => {
        this.mainArray = response.json();
        this.mservice.setMainArray(this.mainArray);
        this.mainArray.map(
          (entry) => {
           // this.addSubArray(entry);
        //   this.createbyFilter(entry);
            this.post.push(entry.post);
            this.city.push(entry.city);
            this.region.push(entry.region);
            this.pathology.push(entry.pathology);
            this.preparation.push(entry.preparation);
            let y = this.getYear(entry.date);
            let q = this.getQuartal(entry.date);
            entry.year = y;
            entry.quartal = q; 
            entry.yq = y +"/"+q;
          }
        )
        this.preparation = this.preparation.filter((v, i, a) => a.indexOf(v) === i);
        this.mservice.setPreparation(this.preparation);
        this.pathology = this.pathology.filter((v, i, a) => a.indexOf(v) === i);       
        this.mservice.setPathology(this.pathology);
        this.post = this.post.filter((v, i, a) => a.indexOf(v) === i);
        this.mservice.setPost(this.post);
        this.city = this.city.filter((v, i, a) => a.indexOf(v) === i);
        this.mservice.setCity(this.city);
        this.region = this.region.filter((v, i, a) => a.indexOf(v) === i);   
        this.mservice.setRegion(this.region);
        this.myCityOptions = this.createMultiSelLists(this.city,this.mylistarr);
        this.mylistarr =[];
        this.myRegionOptions = this.createMultiSelLists(this.region,this.mylistarr);
        this.mylistarr=[];
        this.myPostOptions =this.createMultiSelLists(this.post,this.mylistarr);
        this.mylistarr = [];
        this.myPatOptions =this.createMultiSelLists(this.pathology,this.mylistarr);
        this.mylistarr = [];
        this.myPrepOptions =this.createMultiSelLists(this.preparation,this.mylistarr);
        this.mylistarr = [];
       // getPathologies(arr)
      },
      (error) => console.log(error),

    )
  }
  else{
    this.region = this.mservice.getRegion();
    this.city = this.mservice.getCity();
    this.post = this.mservice.getPost();
    this.pathology = this.mservice.getPathology();
    this.preparation = this.mservice.getPreparation();
    this.myCityOptions = this.createMultiSelLists(this.city,this.mylistarr);
    this.mylistarr =[];
    this.myRegionOptions = this.createMultiSelLists(this.region,this.mylistarr);
    this.mylistarr=[];
    this.myPostOptions =this.createMultiSelLists(this.post,this.mylistarr);
    this.mylistarr = [];
    this.myPatOptions =this.createMultiSelLists(this.pathology,this.mylistarr);
    this.mylistarr = [];
    this.myPrepOptions =this.createMultiSelLists(this.preparation,this.mylistarr);
    this.mylistarr = [];
  }
 
  }
createMultiSelLists(arr1:string[],arr2:IMultiSelectOption[]){
  arr1.map(          
    (val,ind) =>{
      let arrj:{id:string,name:string}={id:"",name:""};
      arrj.id = val;arrj.name = val;            
      arr2[ind]=arrj;
    }
    
  )       
 return arr2;
 // this.myPostOptions= this.mypost;
}
  
onQuery(){
  this.queryArray = this.postservice.transform(this.mainArray,{city:this.myCityModel,region:this.myRegionModel,post:this.mypostModel,
    year1:this.forYear1,quartal1:this.myqModelSt,pathology:this.myPatModel,year2:this.forYear2,quartal2:this.myqModelEnd,
  preparation:this.myPrepModel});
    this.postservice.setQueryArray(this.queryArray);
}
getPathologies(arr){
  let mypat: {id:string,name:string}[] = [];
  let tmparr =[];
  arr.map(
    (entry)=>tmparr.push(entry.pathology)
  )
  this.pathology = tmparr.filter((v, i, a) => a.indexOf(v) === i);
  this.pathology.map(          
    (val,ind) =>{
      let arrj:{id:string,name:string}={id:"",name:""};
      arrj.id = val;arrj.name = val;            
     mypat[ind]=arrj;
     this.myPatOptions = mypat;
    }
  )       
}
onPathology(){
  const arr = this.postservice.transform(this.mainArray,{city:this.myCityModel,region:this.myRegionModel,post:this.mypostModel,
    year1:this.forYear1,quartal1:this.myqModelSt,pathology:undefined})
  this.getPathologies(arr);
 // this.postservice.setPostArray(arr,this.forYear1,this.myqModelSt);
}
setResult(items: any[], criteria1: any,criteria2: any): any {
  let bInclude = false;
  if(criteria1 == undefined || criteria1=="") return false;
  return items.filter(item => {     
      bInclude = false;
     
       for(var i=0; i<this.resultArr.length;i++){         
         if(this.resultArr[i][criteria1] == item[criteria1] && this.resultArr[i][criteria2] == item[criteria2]) {
          this.resultArr[i]['num'] += 1;
          bInclude = true;
          return true;
         }
       }
          
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
  if(criteria1 == undefined || criteria1=="") return false;
  return items.filter(item => {     
     
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
onChart(paramX,paramY,output,type,showY,reverse){
   this.postservice.saveFilter(this.myRegionModel,this.myCityModel,this.mypostModel,this.forYear1,
    this.myqModelSt,this.forYear2,this.myqModelEnd,this.myPatModel,this.myPrepModel)
  this.onQuery();
  if( this.showY==false)this.setResultX( this.postservice.getQueryArray(),paramX,paramY);
  else this.setResult( this.postservice.getQueryArray(),paramX,paramY);
   this.postservice.setResultArray(this.resultArr); 
   this.postservice.setParamsXY(paramX,paramY,output,type,showY,reverse);
   this.router.navigate(['/details']);
 
 }
 
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
onChange($event){
  let i=0;
}
on2Dim(){
  if (this.showY == true && this.type== 'pie') this.type ="bar";
}
}


