import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CalendarioDialogComponent } from './calendario-dialog/calendario-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatRadioModule,
    MatSidenavModule,

  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
aplicarFiltro() {
throw new Error('Method not implemented.');
}

abrirCalendario() {
  this.dialog.open(CalendarioDialogComponent, {
    width: '450px',
  });
}
  @Input() textoNav: string = '';
  estaLogado: boolean = false;
  ehAdm: boolean = false;
  usuario: { nome: string, email: string, cargo: string } = { nome: '', email: '', cargo: '' };

  constructor(
    public dialog: MatDialog,               
    private readonly authService: AuthService,  
    public router: Router
  ) {}


  openCalendarioDialog() {
    const dialogRef = this.dialog.open(CalendarioDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O dialog foi fechado');
    });
  }

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
