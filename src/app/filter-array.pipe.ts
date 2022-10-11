import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {

  transform(array: any[], value: string, key: string): any{
    if(+value === 0) return [...array]
    return array.filter(p => p[key] === value)
  }

}
