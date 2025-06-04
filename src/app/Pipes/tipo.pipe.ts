import { Pipe, PipeTransform } from '@angular/core';
import { TipoSala } from '../Enums/TipoSala.enum';

@Pipe({
  name: 'tipo',
  standalone: true
})
export class TipoPipe implements PipeTransform {

  transform(tipo: number): string {

    if (!tipo) {
      return '';
    }
    
    if (tipo === TipoSala.LabInformatica) {
      return 'Laboratório de Informática';
    } else if (tipo === TipoSala.LabQuimica) {
      return 'Laboratório de Quimica';
    } else if (tipo === TipoSala.SalaComum) { 
      return 'Sala comum';
    } else {
      return 'Tipo inválido';
    }
  }
}