import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Status } from '../../../Enums/Status.enum';
import { ISala } from '../../../Interfaces/Sala.interface';
import { SalaService } from '../../../services/sala.service';
import { CardsSalaComponent } from "./cards-sala/cards-sala.component";
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [CardsSalaComponent, NavBarComponent, CommonModule, AngularMaterialModule]
})
export class PrincipalComponent implements OnInit {

  salas: ISala[] = [];

  salasDisponiveis: number = 0;
  salasReservadas: number = 0;
  salasIndisponiveis: number = 0;

  salasFake: ISala[] = [];

  constructor(private readonly _salaService:  SalaService) {}
   
 

  ngOnInit(): void {
    this.getSalasFake();
    this.atualizarContagens();
  }


  atualizarContagens() {
    this.salasDisponiveis = this.salasFake.filter((salasFake) => salasFake.status === Status.Disponivel).length;
    this.salasReservadas = this.salasFake.filter((salasFake) => salasFake.status === Status.Reservada).length;
    this.salasIndisponiveis = this.salasFake.filter((salasFake) => salasFake.status === Status.Indisponivel).length;
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

  getSalasFake() {
    this.salasFake =  this._salaService.getSalasFake()
  }
}