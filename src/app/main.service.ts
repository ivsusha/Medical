import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class MainService {
  preparation: any;
MainArray;region;city;post;pathology;
  constructor(private http: Http) { }
readJson(){
  let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
  return(this.http.get('/assets/json.json', { headers: headers }));
}
setMainArray(mainArray){
 this.MainArray = mainArray;
}
getMainArray(){ return this.MainArray};
getRegion(){
  return this.region;
};
getCity(){
  return this.city;
}
getPost(){
  return this.post;
}
getPathology(){
  return this.pathology;
}
getPreparation(){
  return this.preparation;
}
setRegion(region){
  this.region = region;
}
setCity(city){
  this.city = city;
}
setPost(post){
  this.post = post;
}
setPathology(pathology){
  this.pathology = pathology;
}
setPreparation(preparation){
  this.preparation = preparation;
}
}

