import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {
  transform(records: Array<any>, args?: any): any {
    return records.sort(function(a, b){
        if(a[args.property] < b[args.property]){
            return -1;
        }
        else if( a[args.property] > b[args.property]){
            return  1;
        }
        else{
             return 0; 
        }
    });
};

}
