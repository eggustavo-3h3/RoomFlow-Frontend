import { CanActivateFn, Router } from '@angular/router';
import { Perfil } from '../Enums/Perfil.enum';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const perfilGuard = (perfisPermitidos: Perfil[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();
    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const perfilTexto: string = payload.Perfil;

      const perfilEnum = getPerfilEnum(perfilTexto);

      if (perfisPermitidos.includes(perfilEnum)) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }

    } catch (err) {
      console.error('Erro ao decodificar token:', err);
      router.navigate(['/login']);
      return false;
    }
  };
};

function getPerfilEnum(perfilStr: string): Perfil {
  switch (perfilStr) {
    case 'Administrador':
      return Perfil.Administrador;
    case 'Professor':
      return Perfil.Professor;
    default:
      return -1 as Perfil;
  }
}