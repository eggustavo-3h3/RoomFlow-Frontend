import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../Interfaces/Usuario.interface';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { ListaDeUsuariosComponent } from "./lista-de-usuarios/lista-de-usuarios.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  templateUrl: './gerenciamento.component.html',
  styleUrl: './gerenciamento.component.css',
  imports: [NavBarComponent, ListaDeUsuariosComponent]
})
export class GerenciamentoComponent implements OnInit {

   snackBar = inject(MatSnackBar);

  constructor(private readonly _usuarioService: UsuarioService) { }

  usuarios: IUsuario[] = [];


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._usuarioService.getUsers().subscribe({
      next: list => {
        this.usuarios = list;
      },
      error: erro => {
        console.log(erro);
      }
    })
  }
  
  removerUsuario(usuarioParaRemover: IUsuario) {
    if (usuarioParaRemover && usuarioParaRemover.id) {
      this._usuarioService.removerUsuario(usuarioParaRemover.id).subscribe({
        next: () => {
          this.snackBar.open('Usuário removido com sucesso', 'Fechar', {
            duration: 5000,
          });
          this.getUsers();
        },
        error: () => {
          this.snackBar.open('Erro ao remover usuário', 'Fechar', {
            duration: 5000,
          });
        }
      })
    }
  }
}
