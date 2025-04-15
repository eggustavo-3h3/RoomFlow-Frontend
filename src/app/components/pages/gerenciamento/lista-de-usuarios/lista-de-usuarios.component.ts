import { Component, Input } from '@angular/core';
import { IUsuario } from '../../../../Interfaces/Usuario.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-lista-de-usuarios',
  standalone: true,
  imports: [MatTableModule,
  ],
  templateUrl: './lista-de-usuarios.component.html',
  styleUrl: './lista-de-usuarios.component.css'
})
export class ListaDeUsuariosComponent {

  displayedColumns: string[] = ['id','login', 'nome', 'perfil','acoes'];


  @Input() usersList: IUsuario[] = [];

}
