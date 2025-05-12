import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Status } from '../../../Enums/Status.enum';
import { ISala } from '../../../Interfaces/Sala.interface';
import { SalaService } from '../../../services/sala.service';
import { CardsSalaComponent } from "./cards-sala/cards-sala.component";
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [CardsSalaComponent, NavBarComponent, CommonModule, AngularMaterialModule]
})
export class PrincipalComponent implements OnInit {

  salas: ISala[] = [];
  snackBar = inject(MatSnackBar);

  salasDisponiveis: number = 0;
  salasReservadas: number = 0;
  salasIndisponiveis: number = 0;

  constructor(private readonly _salaService:  SalaService) {}
   
 

  ngOnInit(): void {
    this.getSalas();
  }


  atualizarContagens() {
    this.salasDisponiveis = this.salas.filter((salas) => salas.statusSala === Status.Disponivel).length;
    this.salasReservadas = this.salas.filter((salas) => salas.statusSala === Status.Reservada).length;
    this.salasIndisponiveis = this.salas.filter((salas) => salas.statusSala === Status.Indisponivel).length;
  }

  getSalas() {
    this._salaService.getSalas().subscribe({
      next: lista => {
        this.salas = lista;
        this.atualizarContagens();
      },
      error: erro => {
          console.log(erro.message);
          this.snackBar.open('Erro ao carregar salas, volte novamente mais tarde!', 'Fechar', {
            duration: 3000
          })
      },
    });
  }
}