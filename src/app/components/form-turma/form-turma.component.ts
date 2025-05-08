import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ICurso } from '../../Interfaces/Curso.interface';
import { CursoService } from '../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaService } from '../../services/turma.service';

@Component({
  selector: 'app-form-turma',
  imports: [
    AngularMaterialModule,
    NavBarComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './form-turma.component.html',
  styleUrl: './form-turma.component.css'
})
export class FormTurmaComponent implements OnInit {

  formTurma: FormGroup = new FormGroup({});
  cursos: ICurso[] = [];
  cursoService = inject(CursoService);
  turmaService = inject(TurmaService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  editando: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
    this.getCursos();

    const turmaParam = this.route.snapshot.paramMap.get('turma');
    if (turmaParam) {
      this.editando = true;
      this.turmaService.getTurmaById(+turmaParam).subscribe({
        next: (curso) => {
          this.formTurma.patchValue(curso);
        },
        error: (error) => {
          console.error('Erro ao buscar curso:', error);
        }
      });
    }
  }


  getCursos() {
    this.cursoService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
      error: (error) => {
        console.error('Erro ao buscar cursos:', error);
      }
    }
    );

  }

  iniciarForm() {
    this.formTurma = this.formBuilder.group(
      {
        descricao: ['', Validators.required],
        curso: ['', Validators.required],
      }
    );
  }

  cadastrar() {
    if (this.formTurma.valid) {

      if (this.editando) {
        this.turmaService.atualizarTurma(this.formTurma.value).subscribe({
          next: (turma) => {
            this.snackBar.open('Turma editada com sucesso!', 'Ok', { duration: 3000 });
            this.formTurma.reset();
            this.router.navigate(['/create']);
          },
          error: (error) => {
            console.error('Erro ao editar turma:', error);
            this.snackBar.open('Erro ao editar turma!', 'Fechar', { duration: 3000 });
            this.formTurma.reset();
          }
        });
        return;
      } else {
        this.turmaService.adicionarTurma(this.formTurma.value).subscribe({
          next: (turma) => {
            this.snackBar.open('Turma cadastrada com sucesso!', 'Ok', { duration: 3000 });
            this.formTurma.reset();
            this.router.navigate(['/create']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar turma:', error);
            this.snackBar.open('Erro ao cadastrar turma!', 'Fechar', { duration: 3000 });
            this.formTurma.reset();
          }
        });
      }
    } else {
      this.snackBar.open('Formulario inválido!', 'Ok', { duration: 3000 });
      this.formTurma.reset();
    }
  }

}