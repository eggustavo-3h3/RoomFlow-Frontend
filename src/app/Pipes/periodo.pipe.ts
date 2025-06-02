import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodo',
  standalone: true
})
export class PeriodoPipe implements PipeTransform {

  transform(periodo: string): string {

    if (!periodo) {
      return '';
    }
    
    if (periodo === 'Manha') {
      return 'Manhã';
    } else if (periodo === 'Tarde') {
      return 'Tarde';
    } else if (periodo === 'Noite') { 
      return 'Noite';
    } else {
      return 'Período inválido';
    }
  }

}
