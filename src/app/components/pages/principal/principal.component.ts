import { Component, EventEmitter, inject, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
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
  
  @ViewChildren(CardsSalaComponent) cards!: QueryList<CardsSalaComponent>;

  salas: ISala[] = [];
  snackBar = inject(MatSnackBar);

  salasDisponiveis: number = 0;
  salasReservadas: number = 0;
  salasIndisponiveis: number = 0;

  constructor(private readonly _salaService: SalaService) {}

  @Output() salaAtualizada = new EventEmitter<ISala>();

  ngOnInit(): void {
    this.getSalas();
  }

  atualizarContagens() {
    this.salasDisponiveis = this.salas.filter(s => s.statusSala === Status.Disponivel).length;
    this.salasReservadas = this.salas.filter(s => s.statusSala === Status.Reservada).length;
    this.salasIndisponiveis = this.salas.filter(s => s.statusSala === Status.Indisponivel).length;
  }

  atualizarSalaReservada(salaReservada: ISala) {
    const index = this.salas.findIndex(s => s.id === salaReservada.id);
    if (index !== -1) {
      this.salas[index] = salaReservada;
    }
    this.atualizarContagens();

    this.snackBar.open(`Sala ${salaReservada.id} reservada com sucesso!`, 'Fechar', {
      duration: 3000,
    });
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

  onReservaConfirmada(salaReservada: ISala) {
    this.atualizarSalaReservada(salaReservada);
    this.fecharTodosCards();
  }
  filtrarPorBloco(bloco: string) {
    this._salaService.getSalas().subscribe({
      next: lista => {
        this.salas = lista.filter(s => s.bloco === bloco);
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
}
