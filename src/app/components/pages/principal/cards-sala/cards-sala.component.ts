import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  inject,
} from '@angular/core';
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
import { TipoPipe } from '../../../../Pipes/tipo.pipe';
import { ExibirNumPipe } from '../../../../Pipes/exibirNum.pipe';
import { Subscription } from 'rxjs';
import { IReserva } from '../../../../Interfaces/reserva.interface';
import { CursoService } from '../../../../services/curso.service';
import { IDisciplina } from '../../../../Interfaces/Disciplina.interface';
import { ICurso } from '../../../../Interfaces/Curso.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    TipoPipe,
    ExibirNumPipe,
  ],
  templateUrl: './cards-sala.component.html',
  styleUrls: ['./cards-sala.component.css'],
})
export class CardsSalaComponent implements OnInit, OnDestroy {
  @Input({ required: true }) mapa!: IMapa;
  @Input({ required: true }) saladesc!: string;

  @Input() mostrarExcluirBotao = false;
  @Input() mostrarEditarBotao = false;
  @Input() botaoReservarSala = false;

  @Output() removerSala = new EventEmitter<string>();
  @Output() editarSala = new EventEmitter<string>();
  @Output() reservaConfirmada = new EventEmitter<IReserva>();

  formulario: FormGroup = new FormGroup({});
  nomeDoProfessor = '';

  data = new Date();

  exibirCard = false;
  mostrarReservaCard = false;
  minDate = new Date();
  salaSeleciona: ISala | null = null;

  snackBar = inject(MatSnackBar);

  Status = Status;
  tipoSalaEnum = TipoSala;
  statusEnum = Status;

  disciplinas: IDisciplina[] = [];
  turmas: ITurma[] = [];
  cursos: ICurso[] = [];
  blocoEnum = Bloco;

  private subscriptions: Subscription[] = [];
  IUsuario: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly salaService: SalaService,
    private readonly disciplinaService: DisciplinaService,
    private readonly turmaService: TurmaService,
    private readonly aulaService: AulaService,
    private readonly cursoService: CursoService
  ) {}

  ngOnInit() {
    this.iniciaForm();

    const blocoSub = this.formulario
      .get('data')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.formulario.get('bloco')?.enable();
        } else {
          this.formulario.get('bloco')?.disable();
        }
      });
    if (blocoSub) this.subscriptions.push(blocoSub);

    this.carregarDisciplinas();
    this.carregarTurmas();
    this.carregarCursos();

    const nome = this.authService.getNomeDoUsuarioLogado();
    if (nome) {
      this.nomeDoProfessor = nome;
    }
  }

  iniciaForm() {
    this.formulario = this.formBuilder.group({
      disciplina: [null, Validators.required],
      curso: [null, Validators.required],
      sala: [null],
      data: [{ value: new Date(), disabled: false }],
      turma: [null, Validators.required],
      professor: [null],
      bloco: [{ value: null, disabled: true }, Validators.required],
    });
  }

  carregarDisciplinas() {
    const sub = this.disciplinaService.getDisciplinas().subscribe({
      next: (res) => (this.disciplinas = res),
      error: (err) => console.error('Erro ao carregar disciplinas:', err),
    });
    this.subscriptions.push(sub);
  }

  carregarTurmas() {
    const sub = this.turmaService.getTurmas().subscribe({
      next: (res) => (this.turmas = res),
      error: (err) => console.error('Erro ao carregar turmas:', err),
    });
    this.subscriptions.push(sub);
  }

  carregarCursos() {
    const sub = this.cursoService.getCursos().subscribe({
      next: (res) => (this.cursos = res),
      error: (err) => console.error('Erro ao carregar cursos:', err),
    });
    this.subscriptions.push(sub);
  }

  toggleCard() {
    this.exibirCard = !this.exibirCard;
    this.salaSeleciona = {
      id: this.mapa.salaId,
      numeroSala: this.mapa.numeroSala,
      descricao: this.mapa.descricao,
      statusSala: this.mapa.statusSala,
      tipoSala:
        TipoSala[this.mapa.tipoSala as unknown as keyof typeof TipoSala],
      flagExibirNumeroSala: this.mapa.flagExibirNumeroSala,
    };
  }

  toggleReservaCard() {
    this.mostrarReservaCard = !this.mostrarReservaCard;
    if (this.mostrarReservaCard) {
      this.formulario.reset();
      this.formulario.patchValue({ data: new Date() });
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

  onEditarSala(salaId: string) {
    if (this.mapa.salaId) {
      this.editarSala.emit(this.mapa.salaId);
      this.exibirCard = false;
    }
  }

  confirmarReserva() {
  if (this.formulario.valid && this.salaSeleciona) {
    const reservaPayload: IReserva = {
      disciplinaId: this.formulario.value.disciplina,
      cursoId: this.formulario.value.curso,
      salaId: this.salaSeleciona.id,
      data: this.formulario.value.data,
      turmaId: this.formulario.value.turma,
      professorId: this.authService.getIdDoUsuarioLogado(),
      bloco: this.formulario.value.bloco,
    };

    this.aulaService.criarAula(reservaPayload).subscribe({
      next: (res) => {
        this.reservaConfirmada.emit(res);
        this.mostrarReservaCard = false;
        this.exibirCard = false;
        this.snackBar.open( 'Aula cadastrada com sucesso', 'Ok', {
          duration: 3000
        });
      },
      error: (err) => {
        this.snackBar.open( 'Erro ao cadastrar aula', 'Ok', {
          duration: 3000
        });
        console.error('Erro ao confirmar reserva:', err);
      },
    });
  } else {
    this.formulario.markAllAsTouched();
  }
}


  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
