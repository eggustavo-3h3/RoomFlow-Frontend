import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { IUsuario } from '../../Interfaces/Usuario.interface';
import { Perfil } from '../../Enums/Perfil.enum';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    AngularMaterialModule,
    CommonModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() textoNav: string = '';
  estaLogado: boolean = false;
  ehAdm: boolean = false;
  usuario: { nome: string, email: string, cargo: string } = { nome: '', email: '', cargo: '' };

  constructor(private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.estaLogado = true;

        this.ehAdm = payload.Perfil === 'Administrador';

        this.usuario = {
          nome: payload.Nome,
          email: payload.Login,
          cargo: this.getPerfilUsuario(payload.Perfil),
        };
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        this.estaLogado = false;
        this.ehAdm = false;
      }
    }
  }

  getPerfilUsuario(perfil: string): string {
    switch (perfil) {
      case 'Administrador':
        return 'Administrador';
      case 'Professor':
        return 'Professor';
      default:
        return 'Usuário';
    }
  }

  
  sairDaConta() {
    this.authService.removerToken();
    this.router.navigate(['/']);
  }
}