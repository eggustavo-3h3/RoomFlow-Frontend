import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { ICurso } from '../../../Interfaces/Curso.interface';
import { ITurma } from '../../../Interfaces/Turma.interface';
import { IDisciplina } from '../../../Interfaces/Disciplina.interface';
import { TurmaService } from '../../../services/turma.service';
import { CursoService } from '../../../services/curso.service';
import { DisciplinaService } from '../../../services/disciplina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-entitys',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './create-entitys.component.html',
  styleUrl: './create-entitys.component.css'
})
export class CreateEntitysComponent implements OnInit {

  cursosList: ICurso[] = [];
  turmasList: ITurma[] = [];
  disciplinasList: IDisciplina[] = [];

  turmaService = inject(TurmaService);
  cursoService = inject(CursoService);
  disciplinaService = inject(DisciplinaService);

  displayedColumnsCursos = ['nome', 'periodo', 'acoes'];
  displayedColumnsTurmas = ['descricao', 'curso', 'acoes'];
  displayedColumnsDisciplinas = ['nome', 'descricao', 'acoes'];

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.getCursos();
    this.getTurmas();
    this.getDisciplinas();
  }

  getCursos() {
    this.cursoService.getCursos().subscribe({
      next: (cursos) => {
        this.cursosList = cursos;
      },
      error: (error) => {
        console.log('Não foi possível carregar cursos:', error);
      }
    })
  };

  getTurmas() {
    this.turmaService.getTurmas().subscribe({
      next: (turma) => {
        this.turmasList = turma;
      },
      error: (error) => {
        console.log('Não foi possível carregar turmas:', error);
      }
    })
  };

  getDisciplinas() {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (disciplina) => {
        this.disciplinasList = disciplina;
      },
      error: (error) => {
        console.log('Não foi possível carregar disciplinas:', error);
      }
    })
  };

  openDialogCurso() {
    this.router.navigate(['formCurso']);
  }

  openDialogDisciplina() {
    this.router.navigate(['formDisciplina']);
  }

  openDialogTurma() {
    this.router.navigate(['formTurma']);
  }
}