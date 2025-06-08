import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { Bloco } from '../../../Enums/Bloco.enum';
import { AulaService } from '../../../services/aula.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TurmaService } from '../../../services/turma.service';
import { CursoService } from '../../../services/curso.service';
import { DisciplinaService } from '../../../services/disciplina.service';
import { SalaService } from '../../../services/sala.service';
import { ICurso } from '../../../Interfaces/Curso.interface';
import { ITurma } from '../../../Interfaces/Turma.interface';
import { IDisciplina } from '../../../Interfaces/Disciplina.interface';
import { ISala } from '../../../Interfaces/Sala.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../Interfaces/Usuario.interface';

import { Subscription } from 'rxjs';
import { DiaSemanaPipe } from '../../../Pipes/diaSemana.pipe';

@Component({
    selector: 'app-gerador',
    standalone: true,
    templateUrl: './gerador.component.html',
    styleUrls: ['./gerador.component.css'],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        NavBarComponent,
        AngularMaterialModule,
        DiaSemanaPipe
    ]
})
export class GeradorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  minDate: Date = new Date();

  diaDaSemana: number | null = null;

  salasList: ISala[] = [];
  cursosList: ICurso[] = [];
  turmasList: ITurma[] = [];
  disciplinasList: IDisciplina[] = [];
  profList: IUsuario[] = [];

  aulaService = inject(AulaService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  salaService = inject(SalaService);
  turmaService = inject(TurmaService);
  cursoService = inject(CursoService);
  disciplinaService = inject(DisciplinaService);
  usuárioService = inject(UsuarioService);

  blocoEnum = [
    { label: 'Bloco 1', value: Bloco.Primeiro },
    { label: 'Bloco 2', value: Bloco.Segundo }
  ];

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      disciplinaId: ['', Validators.required],
      cursoId: ['', Validators.required],
      salaId: ['', Validators.required],
      turmaId: ['', Validators.required],
      professorId: ['', Validators.required],
      diaSemana: [null],
      dataInicio: [null, Validators.required],
      dataFim: [{ value: null, disabled: true }, Validators.required],
      bloco: [null, Validators.required],
    });
  }

  voltar() {
    this.router.navigate(['/principal']);
  }
  
  irParaListaAulas() {
    this.router.navigate(['/lista-aula']);
  }


  getCursos() {
    const sub = this.cursoService.getCursos().subscribe({
      next: (cursos) => {
        this.cursosList = cursos;
      },
      error: (error) => {
       this.snackBar.open('Não foi possível carregar cursos:', 'Ok', {
          duration: 3000
        });
      },
    });
    this.subscriptions.push(sub);
  }

  getTurmas() {
    const sub = this.turmaService.getTurmas().subscribe({
      next: (turma) => {
        this.turmasList = turma;
      },
      error: (error) => {
        console.log('Não foi possível carregar turmas:', error);
      },
    });
    this.subscriptions.push(sub);
  }

  getDisciplinas() {
    const sub = this.disciplinaService.getDisciplinas().subscribe({
      next: (disciplina) => {
        this.disciplinasList = disciplina;
      },
      error: (error) => {
        console.log('Não foi possível carregar disciplinas:', error);
      },
    });
    this.subscriptions.push(sub);
  }

  getSalas() {
    const sub = this.salaService.getSalas().subscribe({
      next: (salas) => {
        this.salasList = salas;
      },
      error: (error) => {
        console.log('Não foi possível carregar salas:', error);
      },
    });
    this.subscriptions.push(sub);
  }

  getProfessores() {
    const sub = this.usuárioService.getProfessores().subscribe({
      next: (prof) => {
        this.profList = prof;
      },
      error: (error) => {
        console.log('Não foi possível carregar professores:', error);
      },
    });
    this.subscriptions.push(sub);
  }

  ngOnInit(): void {
    this.getCursos();
    this.getTurmas();
    this.getDisciplinas();
    this.getSalas();
    this.getProfessores();

    this.form.get('dataInicio')?.valueChanges.subscribe((dataInicio: Date | null) => {
      this.diaDaSemana = dataInicio ? dataInicio.getDay() : null;
    
      const dataFimControl = this.form.get('dataFim');
    
      if (dataInicio) {
        dataFimControl?.enable();
      } else {
        dataFimControl?.disable();
        dataFimControl?.reset(); 
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = {
        ...this.form.value,
        diaSemana: this.diaDaSemana,
      };
      this.aulaService.gerador(formValue).subscribe({
        next: () => {
          this.snackBar.open('Aulas geradas com sucesso', 'Ok', { duration: 3000 });
          this.router.navigate(['/principal']);
        },
        error: () => {
          this.snackBar.open('Erro ao gerar aulas', 'Ok', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
} 