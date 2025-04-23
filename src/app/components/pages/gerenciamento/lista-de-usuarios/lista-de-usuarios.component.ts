import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IUsuario } from '../../../../Interfaces/Usuario.interface';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PerfilPipe } from '../../../../Pipes/perfil.pipe';

@Component({
  selector: 'app-lista-de-usuarios',
  standalone: true,
  imports: [MatTableModule, 
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    PerfilPipe
  ],
  templateUrl: './lista-de-usuarios.component.html',
  styleUrl: './lista-de-usuarios.component.css'
})
export class ListaDeUsuariosComponent implements OnChanges {
  

  displayedColumns: string[] = ['login', 'nome', 'perfil', 'acoes'];

  @Input() usersList: IUsuario[] = [];

  @Output() userDelete = new EventEmitter<IUsuario>();

  ngOnChanges(): void {
    console.log(this.usersList);
    
  }

  onUserDelete(user: IUsuario) {
    this.userDelete.emit(user);
  }

}
