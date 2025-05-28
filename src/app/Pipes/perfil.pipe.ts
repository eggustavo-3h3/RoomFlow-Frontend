import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfil',
  standalone: true,
})
export class PerfilPipe implements PipeTransform {

  transform(perfil: string): string {
    
    if (perfil === '1') {
      return 'Administrador';
    } else if (perfil === '2') {
      return 'Professor';
    } else {
      return 'Perfil inválido';
    }
  }

}
