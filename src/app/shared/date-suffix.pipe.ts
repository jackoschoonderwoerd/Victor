import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'datesuffix'
})

export class DateSuffix implements PipeTransform {
  transform(value: number) {
    switch (value) {
      case 1:
        return value + 'st';
      case 2:
        return value + 'nd';
      case 3:
        return value + 'rd';
      case 21:
        return value + 'st';
      case 22:
        return value + 'nd';
      case 23:
        return value + 'rd';
      case 31:
        return value + 'st';
      default:
        return value + 'th'
    }
  }
}