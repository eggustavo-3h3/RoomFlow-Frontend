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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { SalaService } from '../../../../services/sala.service';
import { TipoSala } from '../../../../Enums/TipoSala.enum';
import { DisciplinaService } from '../../../../services/disciplina.service';
import { TurmaService } from '../../../../services/turma.service';
import { ITurma } from '../../../../Interfaces/Turma.interface';

type NewType = EventEmitter<number>;

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
    MatRadioModule
  ],

  templateUrl: './cards-sala.component.html',
  styleUrl: './cards-sala.component.css'
})
export class CardsSalaComponent implements OnInit {

  @Input() mostrarExcluirBotao: boolean = false;
  @Input() mostrarEditarBotao: boolean = false;
  @Input() botaoReservarSala: boolean = false;
  @Input({ required: true }) sala: ISala = {} as ISala;
  @Input({ required: true }) numSala!: number;
  @Output() removerSala = new EventEmitter<number>();
  @Output() editarSala = new  EventEmitter<ISala>();
  formulario: FormGroup = new FormGroup({});
  nomeDoProfessor: string = '';

  exibirCard: boolean = false;
  mostrarReservaCard: boolean = false;
  isProfessor: boolean = true;
  salaDisponivel: boolean = false;
  mostrarConfirmacaoFinal: boolean = false;
  minDate: Date = new Date();
  salaAtualizada: any;
  Status = Status;
  tipoSalaEnum = TipoSala;
  statusEnum = Status;
  disciplinas: any[] = [];
  turmas: ITurma[] = [];

  

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly salaService: SalaService,
    private readonly disciplinaService: DisciplinaService,
    private readonly turmaService: TurmaService,
  ) { }
  
  iniciaForm() {
    this.formulario = this.formBuilder.group({
      disciplina: [null, [Validators.required]],
      turma: [null, [Validators.required]],
      data: [null, [Validators.required]],
      bloco: [null, [Validators.required]]
    });
  }
  @Output() reservaConfirmada = new EventEmitter<ISala>();

  ngOnInit() {
    this.iniciaForm();
    this.carregarDisciplinas();
    this.carregarTurmas();
  
    const nome = this.authService.getNomeDoUsuarioLogado();
    if (nome) {
      this.nomeDoProfessor = nome;
    }
  
    const token = this.authService.getToken();
    if (token) {
        this.isProfessor = this.authService.usuarioEhProfessor();
    }
  }

  toggleCard() {
    if (this.sala) {
      this.exibirCard = !this.exibirCard;
      this.salaDisponivel = this.sala.status === 'disponivel';
    }
  }
  carregarDisciplinas(): void {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (res) => {
        this.disciplinas = res;
      },
      error: (err) => {
        console.error('Erro ao carregar disciplinas:', err);
      }
    });
  }
  carregarTurmas(): void {
    this.turmaService.getTurmas().subscribe({
      next: (res) => this.turmas = res,
      error: (err) => console.error('Erro ao carregar turmas:', err)
    });
  }

  toggleReservaCard() {
    this.mostrarReservaCard = !this.mostrarReservaCard;
    this.formulario.reset();
  }
  closeReservaCard() {
    this.mostrarReservaCard = false;
    this.exibirCard = false;
  }

confirmarReserva() {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched(); 
    return;
  }

  this.mostrarConfirmacaoFinal = true;
}

 confirmarReservaFinal() {
  if (!this.sala) return;

  
  this.sala.statusSala = Status.Reservada;


  this.salaService.atualizarSala(this.sala).subscribe({
    next: (salaAtualizada) => {
      
      this.salaAtualizada.emit(salaAtualizada);

      this.mostrarConfirmacaoFinal = false;
      this.mostrarReservaCard = false;
      this.formulario.reset();
    },
    error: (err) => {
      console.error('Erro ao atualizar a sala:', err);
    }
  });
}
  
  cancelarConfirmacaoFinal() {
    this.mostrarConfirmacaoFinal = false;
  }

  corDoCard(): string {
    if (this.sala.statusSala === Status.Disponivel) {
      return 'rgb(40, 167, 69)';
    } else if (this.sala.statusSala === Status.Indisponivel) {
      return 'rgb(117, 117, 117)';
    } else {
      return 'rgb(198, 40, 40)';
    }
  }

  onRemoverSala() {
    this.removerSala.emit(this.sala.id);
  }

  onEditarSala() {
    this.editarSala.emit(this.sala);
    this.exibirCard = !this.exibirCard;
  }
}