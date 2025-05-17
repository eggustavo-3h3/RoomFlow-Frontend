import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../Interfaces/Usuario.interface';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { ListaDeUsuariosComponent } from "./lista-de-usuarios/lista-de-usuarios.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  templateUrl: './gerenciamento.component.html',
  styleUrl: './gerenciamento.component.css',
  imports: [NavBarComponent, ListaDeUsuariosComponent, AngularMaterialModule]
})
export class GerenciamentoComponent implements OnInit {

  snackBar = inject(MatSnackBar);

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly dialog: MatDialog
  ) { }

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { user: usuarioParaRemover, message: 'Tem certeza de que deseja remover o usuário?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
        } else {
          this.snackBar.open('Não foi possível encontrar um usuário', 'Fechar', {
            duration: 5000,
          });
        }
      }
    }) 
  }
}
