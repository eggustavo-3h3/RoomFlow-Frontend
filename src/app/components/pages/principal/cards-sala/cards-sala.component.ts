import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../../../Enums/Status.enum';
import { ISala } from '../../../../Interfaces/Sala.interface';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { IUsuario } from '../../../../Interfaces/Usuario.interface';


@Component({
  selector: 'app-cards-sala',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
  ],

  templateUrl: './cards-sala.component.html',
  styleUrl: './cards-sala.component.css'
})
export class CardsSalaComponent {
  @Input() mostrarExcluirBotao: boolean = false;
  @Input() botaoReservarSala: boolean = false;
  @Input({ required: true }) sala: ISala = {} as ISala;
  @Input({ required: true }) numSala!: number;
  @Output() removerSala = new EventEmitter<number>();

  exibirCard: boolean = false;
  mostrarReservaCard: boolean = false;
  materia: any;
  disciplina: any;
  turma: any;
  Sala: {    numero: string, status: Status, tipo: string;}
  usuario: { nome: string, email: string, cargo: string } = { nome: '', email: '', cargo: '' };

  toggleCard() {
    if (this.sala) {
      this.exibirCard = !this.exibirCard;
    }
  }

  toggleReservaCard() {
    this.mostrarReservaCard = !this.mostrarReservaCard;
    this.materia = '';
    this.turma = '';
  }
  closeReservaCard() {
    this.mostrarReservaCard = false;
  }

  confirmarReserva() {
    
    console.log('Reserva confirmada para a sala:', this.numSala);
    console.log('Matéria:', this.materia.nome);
    console.log('Turma:', this.turma.descricao);

    this.closeReservaCard();
  }

  corDoCard(): string {
    if (this.sala.status === Status.Disponivel) {
      return 'rgb(40, 167, 69)';
    } else if (this.sala.status === Status.Indisponivel) {
      return 'rgb(117, 117, 117)';
    } else {
      return 'rgb(198, 40, 40)';
    }
  }

  onRemoverSala() {
    this.removerSala.emit(this.sala.id!);
  }
}
