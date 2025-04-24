import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from '../../../../Enums/Status.enum';
import { ISala } from '../../../../Interfaces/Sala.interface';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';
import { AuthService } from '../../../../services/auth.service';


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
    ReactiveFormsModule,
    AngularMaterialModule
  ],

  templateUrl: './cards-sala.component.html',
  styleUrl: './cards-sala.component.css'
})
export class CardsSalaComponent implements OnInit {

  @Input() mostrarExcluirBotao: boolean = false;
  @Input() botaoReservarSala: boolean = false;
  @Input({ required: true }) sala: ISala = {} as ISala;
  @Input({ required: true }) numSala!: number;
  @Output() removerSala = new EventEmitter<number>();
  formulario: FormGroup = new FormGroup({});
  nomeDoProfessor: string = '';

  exibirCard: boolean = false;
  mostrarReservaCard: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) { }
  
  iniciaForm() {
    this.formulario = this.formBuilder.group({
      materia: [null, [Validators.required]],
      turma: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.iniciaForm();

    const nome = this.authService.getNomeDoUsuarioLogado();

    if (nome) {
      this.nomeDoProfessor = nome;
    }
  }

  toggleCard() {
    if (this.sala) {
      this.exibirCard = !this.exibirCard;
    }
  }

  toggleReservaCard() {
    this.mostrarReservaCard = !this.mostrarReservaCard;
    this.formulario.reset();
  }
  closeReservaCard() {
    this.mostrarReservaCard = false;
  }

  confirmarReserva() {
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
