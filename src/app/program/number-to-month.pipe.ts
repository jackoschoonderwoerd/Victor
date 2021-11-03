import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'numbertomonth'
})

export class NumberToMonth implements PipeTransform {
  transform(value: number) {
    switch (value) {
      case 1:
        return 'januari';
      case 2:
        return 'februari';
      case 3:
        return 'march';
      case 4:
        return 'april';
      case 5:
        return 'may';
      case 6:
        return 'june';
      case 7:
        return 'july';
      case 8:
        return 'august';
      case 9:
        return 'september';
      case 10:
        return 'october';
      case 11:
        return 'november';
      case 12:
        return 'december';
      default:
        return value
    }
  }
}