import { Pipe, PipeTransform } from '@angular/core';
import { TipoSala } from '../Enums/TipoSala.enum';

@Pipe({
  name: 'exibirNum',
  standalone: true
})
export class ExibirNumPipe implements PipeTransform {

  transform(exibirNum: boolean): string {
    
    if (exibirNum) {
      return 'Sim';
    } else {
      return 'Não';
    }
  }
}