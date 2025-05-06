import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PerfilPipe } from "../../../Pipes/perfil.pipe";
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../Interfaces/Usuario.interface';

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [NavBarComponent,
    MatIconModule,
    MatTableModule, 
    PerfilPipe,
    AngularMaterialModule,
    ],
  templateUrl: './solicitacao.component.html',
  styleUrl: './solicitacao.component.css'
})
export class SolicitacaoComponent implements OnInit {
// falta chamar na api
solicitacoes: IUsuario[] = [];

  displayedColumns: string[] = ['nome','login', 'perfil', 'acoes'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsers().subscribe({
      next: (usuarios) => {
        this.solicitacoes = usuarios.filter(user => user.status === 'pendente'); // confirmar se tem no BD
      },
      error: (err) => {
        console.error('Erro ao buscar solicitações:', err);
      }
    });
  }

  aceitarSolicitacao(user: IUsuario) {
    this.usuarioService.aprovarUsuario(user.id).subscribe({
      next: () => {
        this.removerDaLista(user);
      },
      error: (err) => {
        console.error('Erro ao aprovar usuário:', err);
      }
    });
  }
  
  rejeitarSolicitacao(user: IUsuario) {
    this.usuarioService.rejeitarUsuario(user.id).subscribe({
      next: () => {
        this.removerDaLista(user);
      },
      error: (err) => {
        console.error('Erro ao rejeitar usuário:', err);
      }
    });
  }
  
  removerDaLista(user: IUsuario) {
    this.solicitacoes = this.solicitacoes.filter(u => u.id !== user.id);
  }
}

