import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { IUsuario } from '../../Interfaces/Usuario.interface';


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
export class NavBarComponent {
  @Input() textoNav: string = '';
  usuario: { nome: string; email: string; cargo: string } | null = null;

  

  constructor(
    private readonly authService: AuthService,
    private readonly router : Router
  ) { }
  
  sairDaConta() {
    this.authService.removerToken();
    this.router.navigate(['/']);
  }
  
}