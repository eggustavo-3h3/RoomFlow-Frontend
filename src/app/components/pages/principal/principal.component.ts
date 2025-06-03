import { Component, EventEmitter, inject, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Status } from '../../../Enums/Status.enum';
import { ISala } from '../../../Interfaces/Sala.interface';
import { SalaService } from '../../../services/sala.service';
import { CardsSalaComponent } from "./cards-sala/cards-sala.component";
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { IMapa } from '../../../Interfaces/Mapa.interface';

@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  imports: [CardsSalaComponent, NavBarComponent, CommonModule, AngularMaterialModule]
})
export class PrincipalComponent implements OnInit {
  
  @ViewChildren(CardsSalaComponent) cards!: QueryList<CardsSalaComponent>;

  salas: ISala[] = [];

  mapa : IMapa[] = [];

  snackBar = inject(MatSnackBar);
  authService = inject(AuthService);

  salasDisponiveis: number = 0;
  salasReservadas: number = 0;
  salasIndisponiveis: number = 0;

  constructor(private readonly _salaService: SalaService) {}

  @Output() salaAtualizada = new EventEmitter<ISala>();

  ngOnInit(): void {
    this.getMapa();
    this.atualizarContagens();
  }

  atualizarContagens() {
    this.salasDisponiveis = this.mapa.filter(s => s.statusSala.toString() === 'Disponivel').length;
    this.salasReservadas = this.mapa.filter(s => s.statusSala.toString() === 'Ocupada').length;
    this.salasIndisponiveis = this.mapa.filter(s => s.statusSala.toString() === 'Indisponivel').length;
  }

  atualizarSalaReservada(salaReservada: ISala) {
    const index = this.salas.findIndex(s => s.id === salaReservada.id);
    if (index !== -1) {
      this.salas = [
      ...this.salas.slice(0, index),
  salaReservada,
      ...this.salas.slice(index + 1)
];
    }
    this.atualizarContagens();

    this.snackBar.open(`Sala ${salaReservada.id} reservada com sucesso!`, 'Fechar', {
      duration: 3000,
    });
  }

  getMapa() {
    this._salaService.getMapa().subscribe({
      next: lista => {
        console.log(lista);
        this.mapa = lista;
        this.atualizarContagens();
      },
      error: erro => {
        console.log(erro.message);
        this.snackBar.open('Erro ao carregar salas, volte novamente mais tarde!', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  fecharTodosCards() {
    this.cards.forEach(card => {
      card.exibirCard = false;
      card.mostrarReservaCard = false;
      card.mostrarConfirmacaoFinal = false;
    });
  }
}