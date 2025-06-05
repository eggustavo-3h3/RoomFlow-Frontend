import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaSemana',
  standalone: true,
})
export class DiaSemanaPipe implements PipeTransform {

transform(diaDaSemana: number): string {
   switch (diaDaSemana) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda-Feira';
        case 2:
        return 'Terça-Feira';
        case 3:
        return 'Quarta-Feira';
        case 4:
        return 'Quinta-Feira';
        case 5:
        return 'Sexta-Feira';
      default:
        return 'Sabado';
    }
}
}