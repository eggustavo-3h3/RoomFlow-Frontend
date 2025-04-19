import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { CardsSalaComponent } from '../principal/cards-sala/cards-sala.component';
import { SalaService } from '../../../services/sala.service';
import { ISala } from '../../../Interfaces/Sala.interface';
import { Status } from '../../../Enums/Status.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alterar-mapa',
  standalone: true,
  imports: [
    NavBarComponent,
    MatCardModule,
    CardsSalaComponent,
    CommonModule,
],
  templateUrl: './alterar-mapa.component.html',
  styleUrl: './alterar-mapa.component.css'
})
export class AlterarMapaComponent implements OnInit {

  salas: ISala[] = [];

  constructor(private readonly _salaService:  SalaService) {}
   
 

  ngOnInit(): void {
    this.getSalas();
    
  }

  salasDisponiveis = this.salas.filter((salas) => salas.status === Status.Disponivel).length;

  salasReservadas = this.salas.filter((salas) => salas.status === Status.Reservada).length;

  salasIndisponiveis = this.salas.filter((salas) => salas.status === Status.Indisponivel).length;

  getSalas() {
    this._salaService.getSalas().subscribe({
      next: lista => {
        this.salas = lista;
      },
      error: erro => {
          console.log(erro.message);
      },
    });
  }
}
