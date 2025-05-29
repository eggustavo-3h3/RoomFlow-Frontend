import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Perfil } from '../../Enums/Perfil.enum';
import { PerfilPipe } from "../../Pipes/perfil.pipe";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
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
    PerfilPipe
  ]
})
export class NavBarComponent implements OnInit {
  @Input() textoNav: string = '';
  @Output() blocoSelecionado = new EventEmitter<string>(); // ← AQUI

  estaLogado: boolean = false;
  ehAdm: boolean = false;
  usuario: { nome: string, email: string, cargo: string } = { nome: '', email: '', cargo: '' };

  constructor(
    public dialog: MatDialog,
    private readonly authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.estaLogado = true;
        this.ehAdm = payload.Perfil === Perfil.Administrador;
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
      case '1': return '1';
      case '2': return '2';
      default: return '';
    }
  }

  sairDaConta() {
    this.authService.removerToken();
    this.router.navigate(['/']);
  }

  abrirCalendario() {
    this.dialog.open(CalendarioDialogComponent, {
      width: '450px',
    });
  }

  onSelecionarBloco(bloco: string) { // ← AQUI
    this.blocoSelecionado.emit(bloco);
  }

  aplicarFiltro() {
    throw new Error('Method not implemented.');
  }
}
