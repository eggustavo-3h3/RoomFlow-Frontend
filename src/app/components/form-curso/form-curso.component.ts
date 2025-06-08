import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Periodo } from '../../Enums/Periodo.enum';
import { PeriodoPipe } from '../../Pipes/periodo.pipe';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-form-curso',
  standalone: true,
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    PeriodoPipe,
    NavBarComponent,
  ],
  templateUrl: './form-curso.component.html',
  styleUrl: './form-curso.component.css',
})
export class FormCursoComponent implements OnInit, OnDestroy { // <-- adiciona OnDestroy
  formCurso: FormGroup = new FormGroup({});
  periodos = [Periodo.MANHA, Periodo.TARDE, Periodo.NOITE];
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  cursoService = inject(CursoService);
  editando: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}
  
  voltar() {
    this.router.navigate(['/create']);
  }

  ngOnInit(): void {
    this.iniciarForm();

    const cursoParam = this.route.snapshot.paramMap.get('id');

    if (cursoParam) {
      this.cursoService.getCursoById(cursoParam).subscribe({
        next: (curso) => {
          this.editando = true;
          const cursoParaPatch = {
            id: curso.id || curso.id,
            nome: curso.nome,
            periodo: curso.periodo,
          };
          this.formCurso.patchValue(cursoParaPatch);
        },
      });
    }
  }

  ngOnDestroy(): void {
    // Aqui você pode colocar cancelamento de subscriptions futuramente se quiser
  }

  iniciarForm() {
    this.formCurso = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      periodo: [null, Validators.required],
    });
  }

  cadastrar() {
    if (this.formCurso.valid) {
      if (this.editando) {
        this.cursoService.atualizarCurso(this.formCurso.value).subscribe({
          next: (curso) => {
            this.snackBar.open('Curso atualizado com sucesso!', 'Ok', {
              duration: 3000,
            });
            this.formCurso.reset();
            this.router.navigate(['/create']);
          },
          error: (error) => {
            console.error('Erro ao atualizar curso:', error);
            this.snackBar.open('Erro ao atualizar curso!', 'Fechar', {
              duration: 3000,
            });
            this.formCurso.reset();
          },
        });
        return;
      } else {
        this.cursoService.adicionarCurso(this.formCurso.value).subscribe({
          next: (curso) => {
            this.snackBar.open('Curso cadastrado com sucesso!', 'Ok', {
              duration: 3000,
            });
            this.formCurso.reset();
            this.router.navigate(['/create']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar curso:', error);
            this.snackBar.open('Erro ao cadastrar curso!', 'Fechar', {
              duration: 3000,
            });
            this.formCurso.reset();
          },
        });
      }
    } else {
      this.snackBar.open('Formulario inválido!', 'Ok', { duration: 3000 });
      this.formCurso.reset();
    }
  }
}
