import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'nametitlecase'
})

export class NameTitlecase implements PipeTransform {
  changeNots = ['van', 'de', 'der', 'den', 'in', '\'t', 'la', 'jr']
  transform(name: string) {
    let nameArray = name.toLowerCase().split(' ')
    for (let i = 0; i < nameArray.length; i++) {
      if (this.changeNots.indexOf(nameArray[i]) < 0) {
        nameArray[i] = nameArray[i][0].toUpperCase() + nameArray[i].slice(1);
      }
    }
    return (nameArray.join(' '));
  }
}