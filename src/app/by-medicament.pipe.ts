import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byMedicament'
})
export class ByMedicamentPipe implements PipeTransform {
  transform(records: Array<any>, args?: any): any {
    return records.sort(function(a, b){
        if(a[args.medicament] < b[args.medicament]){
            return -1;
        }
        else if( a[args.medicament] > b[args.medicament]){
            return  1;
        }
        else{
             return 0;
        }
    });
};

}
