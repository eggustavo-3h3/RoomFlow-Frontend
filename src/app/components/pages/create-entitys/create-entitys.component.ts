import { Component, inject, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { ICurso } from '../../../Interfaces/Curso.interface';
import { ITurma } from '../../../Interfaces/Turma.interface';
import { IDisciplina } from '../../../Interfaces/Disciplina.interface';
import { TurmaService } from '../../../services/turma.service';
import { CursoService } from '../../../services/curso.service';
import { DisciplinaService } from '../../../services/disciplina.service';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { PeriodoPipe } from '../../../Pipes/periodo.pipe';
import { IUsuario } from '../../../Interfaces/Usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-entitys',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, NavBarComponent, PeriodoPipe],
  templateUrl: './create-entitys.component.html',
  styleUrl: './create-entitys.component.css',
})
export class CreateEntitysComponent implements OnInit {
  
  cursoSelected: ICurso | null = null;
  turmaSelected: ITurma | null = null;
  disciplinaSelected: IDisciplina | null = null;
  cursosList: ICurso[] = [];
  turmasList: ITurma[] = [];
  disciplinasList: IDisciplina[] = [];

  snackbar = inject(MatSnackBar);

  turmaService = inject(TurmaService);
  cursoService = inject(CursoService);
  disciplinaService = inject(DisciplinaService);

  displayedColumnsCursos = ['nome', 'periodo', 'acoes'];
  displayedColumnsTurmas = ['descricao', 'curso', 'acoes'];
  displayedColumnsDisciplinas = ['nome', 'descricao', 'acoes'];

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCursos();
    this.getTurmas();
    this.getDisciplinas();
  }

  getCursos() {
    this.cursoService.getCursos().subscribe({
      next: (cursos) => {
        this.cursosList = cursos;
        console.log(cursos);
        
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

  openDialogCurso() {
    this.router.navigate(['formCurso']);
  }

  openDialogDisciplina() {
    this.router.navigate(['formDisciplina']);
  }

  openDialogTurma() {
    this.router.navigate(['formTurma']);
  }

  selecionarCurso(curso: ICurso) {
    this.cursoSelected = curso;
    this.router.navigate(['/formCurso', curso.id]);
  }

  selecionarTurma(turma: ITurma) {
    console.log('Selecionando turma com ID:', turma.id);
    this.turmaSelected = turma;
    this.router.navigate(['/formTurma', turma.id]);
  }

  selecionarDisciplina(disciplina: IDisciplina) {
    this.disciplinaSelected = disciplina;
    this.router.navigate([
      '/formDisciplina', disciplina.id
    ]);
  }

  onCursoDelete(curso: ICurso) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        curso: curso,
        message: 'Tem certeza de que deseja remover o curso?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cursoService.removerCurso(curso.id!).subscribe({
          next: (deletado) => {
            this.snackbar.open('Curso deletado', 'Ok', {
              duration: 3000,
            });
            this.getCursos();
            this.getDisciplinas();
            this.getTurmas();
          },
          error: (erro) => {
            this.snackbar.open('Erro ao deletar curso', 'Ok', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  onTurmaDelete(turma: ITurma) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        turma: turma,
        message: 'Tem certeza de que deseja remover a turma?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.turmaService.removerTurma(turma.id!).subscribe({
          next: (deletado) => {
            this.snackbar.open('Turma deletada', 'Ok', {
              duration: 3000,
            });
            this.getCursos();
            this.getDisciplinas();
            this.getTurmas();
          },
          error: (erro) => {
            this.snackbar.open('Erro ao deletar turma', 'Ok', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  onDisciplinaDelete(disciplina: IDisciplina) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        disciplina: disciplina,
        message: 'Tem certeza de que deseja remover a disciplina?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.disciplinaService.removerDisciplina(disciplina.id!).subscribe({
          next: (deletado) => {
            this.snackbar.open('Disciplina deletada', 'Ok', {
              duration: 3000,
            });
            this.getCursos();
            this.getDisciplinas();
            this.getTurmas();
          },
          error: (erro) => {
            this.snackbar.open('Erro ao deletar Disciplina', 'Ok', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}