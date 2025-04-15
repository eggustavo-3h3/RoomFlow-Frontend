import { Component, OnInit } from '@angular/core';
import { Status } from '../../../Enums/Status.enum';
import { ISala } from '../../../Interfaces/Sala.interface';
import { SalaService } from '../../../services/sala.service';
import { CardsSalaComponent } from "./cards-sala/cards-sala.component";
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [CardsSalaComponent, NavBarComponent, CommonModule]
})
export class PrincipalComponent implements OnInit {

  salas: ISala[] = [];

  constructor(private readonly _salaService:  SalaService) {}

  ngOnInit(): void {
      this.getSalas();
  }

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
  

  salasDisponiveis = this.salas.filter((salas) => salas.status === Status.Disponivel).length;

  salasReservadas = this.salas.filter((salas) => salas.status === Status.Reservada).length;

  salasIndisponiveis = this.salas.filter((salas) => salas.status === Status.Indisponivel).length;


}
