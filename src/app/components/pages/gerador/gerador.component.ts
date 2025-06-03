import { Component, inject, Inject, OnInit } from '@angular/core';
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
import { AutocompleteHarnessFilters } from '@angular/material/autocomplete/testing';
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

@Component({
  selector: 'app-gerador',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NavBarComponent,
    AngularMaterialModule
],
  templateUrl: './gerador.component.html',
  styleUrls: ['./gerador.component.css'],
})
export class GeradorComponent implements OnInit {
  form: FormGroup;

  minDate: Date = new Date();

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
    ]

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      disciplinaId: ['', Validators.required],
      cursoId: ['', Validators.required],
      salaId: ['', Validators.required],
      turmaId: ['', Validators.required],
      //data: [null],
      professorId: ['', Validators.required],
      diaSemana: [null, [Validators.required, Validators.min(0), Validators.max(6)]],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      bloco: [null, Validators.required],
    });
  }

  getCursos() {
    this.cursoService.getCursos().subscribe({
      next: (cursos) => {
        this.cursosList = cursos;
      },
      error: (error) => {
        console.log('Não foi possível carregar cursos:', error);
      },
    });
  }

  getTurmas() {
    this.turmaService.getTurmas().subscribe({
      next: (turma) => {
        this.turmasList = turma;
      },
      error: (error) => {
        console.log('Não foi possível carregar turmas:', error);
      },
    });
  }

  getDisciplinas() {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (disciplina) => {
        this.disciplinasList = disciplina;
      },
      error: (error) => {
        console.log('Não foi possível carregar disciplinas:', error);
      },
    });
  }

  getSalas() {
    this.salaService.getSalas().subscribe({
      next: (salas) => {
        this.salasList = salas;
        console.log(this.salasList);
        
      },
      error: (error) => {
        console.log('Não foi possível carregar salas:', error);
      },
    });
  }

  getProfessores() {
    this.usuárioService.getProfessores().subscribe({
      next: (prof) => {
        this.profList = prof;
        console.log('Professores:', this.profList);
      },
      error: (error) => {
        console.log('Não foi possível carregar professores:', error);
      },
    });
  }

  ngOnInit(): void {
    this.getCursos();
    this.getTurmas();
    this.getDisciplinas();
    this.getSalas();
    this.getProfessores();
  }

  onSubmit() {
    if (this.form.valid) {

      this.aulaService.gerador(this.form.value).subscribe({
        next : ger => {
          this.snackBar.open('Aulas geradas com sucesso', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/principal']);
        }, 
        error : err => {
          this.snackBar.open('Erro ao gerar aulas', 'Ok', {
            duration: 3000
          });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
