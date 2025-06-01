import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Perfil } from '../Enums/Perfil.enum';

export const perfilGuard = (perfisPermitidos: Perfil[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    const perfil = authService.getPerfil();

    if (!perfil) {
      router.navigate(['/login']);
      return false;
    }

    if (perfisPermitidos.includes(perfil)) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  };
};
