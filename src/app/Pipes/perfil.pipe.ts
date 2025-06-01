import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfil',
  standalone: true,
})
export class PerfilPipe implements PipeTransform {

transform(perfil: string): string {
   switch (perfil) {
      case 'Administrador':
        return 'Administrador';
      case 'Professor':
        return 'Professor';
      default:
        return 'Perfil inválido';
    }
}
}