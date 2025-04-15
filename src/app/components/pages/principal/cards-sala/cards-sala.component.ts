import { Component, Input } from '@angular/core';
import { Status } from '../../../../Enums/Status.enum';
import { ISala } from '../../../../Interfaces/Sala.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cards-sala',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './cards-sala.component.html',
  styleUrl: './cards-sala.component.css'
})
export class CardsSalaComponent {  
  @Input({ required: true }) sala: ISala = {} as ISala;

  exibirCard: boolean = false;

  toggleCard() {
    if(this.sala.status === Status.Reservada) {
      this.exibirCard = !this.exibirCard;
    } 
  }

  corDoCard(): string {
    if (this.sala.status === Status.Disponivel) {
      return 'rgb(40, 167, 69) ';
    } else if (this.sala.status === Status.Indisponivel) {
      return 'rgb(117, 117, 117)';
    } else {
      return 'rgb(198, 40, 40)';
    }
  }

}
