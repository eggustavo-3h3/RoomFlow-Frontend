import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PerfilPipe } from "../../../Pipes/perfil.pipe";
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../Interfaces/Usuario.interface';
import { StatusUsuario } from '../../../Enums/StatusUsuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [
    NavBarComponent,
    MatIconModule,
    MatTableModule, 
    PerfilPipe,
    AngularMaterialModule,
    CommonModule
  ],
  templateUrl: './solicitacao.component.html',
  styleUrl: './solicitacao.component.css'
})
export class SolicitacaoComponent implements OnInit, OnDestroy {

  solicitacoes: IUsuario[] = [];

  snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['nome','login', 'perfil', 'acoes'];

  private subscriptions: Subscription[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    const sub = this.usuarioService.getUsersPendentes().subscribe({
      next: (usuarios) => {
        this.solicitacoes = usuarios;
      },
      error: (err) => {
        console.error('Erro ao buscar solicitações:', err);
      }
    });
    this.subscriptions.push(sub);
  }

  aceitarSolicitacao(user: IUsuario) {
    const sub = this.usuarioService.usuarioAtivar(user.id!).subscribe({
      next: () => {
        this.removerDaLista(user);
        this.snackBar.open('Usuario aceito', 'Ok', { duration: 3000 });
      },
      error: (err) => {
        console.error('Erro ao aprovar usuário:', err);
        this.snackBar.open('Erro ao aceitar usuário', 'Ok', { duration: 3000 });
      }
    });
    this.subscriptions.push(sub);
  }
  
  rejeitarSolicitacao(user: IUsuario) {
    const sub = this.usuarioService.usuarioInativar(user.id!).subscribe({
      next: () => {
        this.removerDaLista(user);
        this.snackBar.open('Usuario Rejeitado', 'Ok', { duration: 3000 });
      },
      error: (err) => {
        console.error('Erro ao rejeitar usuário:', err);
        this.snackBar.open('Erro ao rejeitar usuário', 'Ok', { duration: 3000 });
      }
    });
    this.subscriptions.push(sub);
  }
  
  removerDaLista(user: IUsuario) {
    this.solicitacoes = this.solicitacoes.filter(u => u.id !== user.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
