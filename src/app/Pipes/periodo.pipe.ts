import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodo',
  standalone: true
})
export class PeriodoPipe implements PipeTransform {

  transform(periodo: number): string {

    if (!periodo) {
      return '';
    }
    
    if (periodo === 1) {
      return 'Manhã';
    } else if (periodo === 2) {
      return 'Tarde';
    } else if (periodo === 3) { 
      return 'Noite';
    } else {
      return 'Período inválido';
    }
  }

}
