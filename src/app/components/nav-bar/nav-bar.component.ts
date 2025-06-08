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
import { ISala } from '../../Interfaces/Sala.interface';

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

  estaLogado = false;
  ehAdm = false;
  usuario = { nome: '', email: '', cargo: '' };

  constructor(
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    public readonly router: Router
  ) {}

  ngOnInit(): void {
    this.estaLogado = this.authService.isLoggedIn();

    if (this.estaLogado) {
      const user = this.authService.getUsuario();
      const perfil = this.authService.getPerfil();

      this.ehAdm = perfil === Perfil.Administrador;

      this.usuario = {
        nome: user?.nome || '',
        email: user?.login || '',
        cargo: user?.perfil || ''
      };
    }
  }

  sairDaConta() {
    this.authService.removerToken();
    this.router.navigate(['/']);
  }

  abrirCalendario() {
    const dialogRef = this.dialog.open(CalendarioDialogComponent, { width: '410px' });

    dialogRef.afterClosed().subscribe((salasFiltradas: ISala[]) => {
      if (salasFiltradas) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["principal"]);        
        }
      )};
    })    
  }
}
