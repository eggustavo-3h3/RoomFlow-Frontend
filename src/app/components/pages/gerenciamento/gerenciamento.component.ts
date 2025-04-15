import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../Interfaces/Usuario.interface';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { ListaDeUsuariosComponent } from "./lista-de-usuarios/lista-de-usuarios.component";

@Component({
    selector: 'app-gerenciamento',
    standalone: true,
    templateUrl: './gerenciamento.component.html',
    styleUrl: './gerenciamento.component.css',
    imports: [NavBarComponent, ListaDeUsuariosComponent]
})
export class GerenciamentoComponent implements OnInit {

  constructor(private readonly _usuarioService: UsuarioService) {}

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

}
