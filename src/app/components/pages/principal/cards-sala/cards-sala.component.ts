import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from '../../../../Enums/Status.enum';
import { ISala } from '../../../../Interfaces/Sala.interface';
import { IMapa } from '../../../../Interfaces/Mapa.interface';
import { ITurma } from '../../../../Interfaces/Turma.interface';
import { Bloco } from '../../../../Enums/Bloco.enum';
import { TipoSala } from '../../../../Enums/TipoSala.enum';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { SalaService } from '../../../../services/sala.service';
import { DisciplinaService } from '../../../../services/disciplina.service';
import { TurmaService } from '../../../../services/turma.service';
import { AulaService } from '../../../../services/aula.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';

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
    AngularMaterialModule,
    MatDatepickerModule,
    MatRadioModule,
  ],
  templateUrl: './cards-sala.component.html',
  styleUrls: ['./cards-sala.component.css']
})
export class CardsSalaComponent implements OnInit {

  @Input({ required: true }) mapa!: IMapa;
  @Input({ required: true }) saladesc!: string;

  @Input() mostrarExcluirBotao = false;
  @Input() mostrarEditarBotao = false;
  @Input() botaoReservarSala = false;

  @Output() removerSala = new EventEmitter<string>();
  @Output() editarSala = new EventEmitter<string>();
  @Output() reservaConfirmada = new EventEmitter<ISala>();

  formulario: FormGroup = new FormGroup({});
  nomeDoProfessor = '';

  exibirCard = false;
  mostrarReservaCard = false;
  isProfessor = false;
  salaDisponivel = false;
  mostrarConfirmacaoFinal = false;
  minDate = new Date();
  salaSeleciona: ISala | null = null;

  Status = Status;
  tipoSalaEnum = TipoSala;
  statusEnum = Status;

  disciplinas: any[] = [];
  turmas: ITurma[] = [];
  blocoEnum = Bloco;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly salaService: SalaService,
    private readonly disciplinaService: DisciplinaService,
    private readonly turmaService: TurmaService,
    private readonly aulaService: AulaService
  ) { }

  ngOnInit() {
    this.iniciaForm();

    this.formulario.get('bloco')?.disable();

    this.formulario.get('data')?.valueChanges.subscribe(value => {
      if (value) {
        this.formulario.get('bloco')?.enable();
      } else {
        this.formulario.get('bloco')?.disable();
      }
    });

    this.carregarDisciplinas();
    this.carregarTurmas();

    const nome = this.authService.getNomeDoUsuarioLogado();
    if (nome) {
      this.nomeDoProfessor = nome;
    }

    this.isProfessor = this.authService.usuarioEhProfessor();
  }

  iniciaForm() {
    this.formulario = this.formBuilder.group({
      disciplina: [null, Validators.required],
      turma: [null, Validators.required],
      data: [null, Validators.required],
      bloco: [null, Validators.required],
    });
  }

  carregarDisciplinas() {
    this.disciplinaService.getDisciplinas().subscribe({
      next: res => this.disciplinas = res,
      error: err => console.error('Erro ao carregar disciplinas:', err)
    });
  }

  carregarTurmas() {
    this.turmaService.getTurmas().subscribe({
      next: res => this.turmas = res,
      error: err => console.error('Erro ao carregar turmas:', err)
    });
  }

  toggleCard() {
    this.exibirCard = !this.exibirCard;
    
    this.salaSeleciona = {
    id: this.mapa.salaId,
    numeroSala: this.mapa.numeroSala,
    descricao: this.mapa.descricao,
    statusSala: this.mapa.statusSala,
    tipoSala: TipoSala[this.mapa.tipoSala as unknown as keyof typeof TipoSala],
    flagExibirNumeroSala: this.mapa.flagExibirNumeroSala
  };
  }

  toggleReservaCard() {
    this.mostrarReservaCard = !this.mostrarReservaCard;
    if (this.mostrarReservaCard) {
      this.formulario.reset();
    }
  }

  closeReservaCard() {
    this.mostrarReservaCard = false;
    this.exibirCard = false;
  }

  corDoCardClass() {
    switch (this.mapa.statusSala.toString()) {
      case 'Disponivel':
        return 'card-disponivel';
      case 'Indisponivel':
        return 'card-indisponivel';
      default:
        return 'card-reservado';
    }
  }

  onRemoverSala() {
    this.removerSala.emit(this.mapa.salaId);
  }

  onEditarSala(salaId : string) {
    if (this.mapa.salaId) {
      this.editarSala.emit(this.mapa.salaId);
      this.exibirCard = false;
    }
  }
}
