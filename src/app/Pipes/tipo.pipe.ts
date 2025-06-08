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
    } else if (tipo === TipoSala.LabEnfermagem) { 
      return 'Laboratório de Enfermagem';
    } else if (tipo === TipoSala.LabEletrica) { 
      return 'Laboratório de Elétrica';
    } else if (tipo === TipoSala.LabMecatronica) { 
      return 'Laboratório de Mecatrônica';
    } else if (tipo === TipoSala.Oficina) { 
      return 'Oficina Mecânica';
    } else if (tipo === TipoSala.Quadra) { 
      return 'Quadra Esportiva';
    } else if (tipo === TipoSala.SalaMaker) { 
      return 'Sala Maker';
    } else if (tipo === TipoSala.Biblioteca) { 
      return 'Biblioteca';
    } else {
      return 'Tipo inválido';
    }
  }
}