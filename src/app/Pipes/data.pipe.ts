import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPipe',
  standalone: true,
})
export class DataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
