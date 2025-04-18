import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    AngularMaterialModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() textoNav: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router : Router
  ) { }
  
  sairDaConta() {
    this.authService.removerToken();
    this.router.navigate(['/']);
  }
  
}