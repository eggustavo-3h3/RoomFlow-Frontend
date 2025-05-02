import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ICurso } from '../../Interfaces/Curso.interface';
import { CursoService } from '../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarForm();
    this.getCursos();
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
      this.cursoService.adicionarCurso(this.formTurma.value).subscribe({
        next: (curso) => {
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
    } else {
      this.snackBar.open('Formulario inválido!', 'Ok', { duration: 3000 });
      this.formTurma.reset();
    }
  }
}
