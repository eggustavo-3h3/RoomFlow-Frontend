import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaService } from '../../services/disciplina.service';

@Component({
  selector: 'app-form-disciplina',
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    NavBarComponent,
  ],
  templateUrl: './form-disciplina.component.html',
  styleUrl: './form-disciplina.component.css'
})
export class FormDisciplinaComponent implements OnInit {

  formDisciplina: FormGroup = new FormGroup({});
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  disciplinaService = inject(DisciplinaService);
  editando: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();

    const disciplinaParam = this.route.snapshot.paramMap.get('disciplina');

    if (disciplinaParam) {
      this.editando = true;
      this.disciplinaService.getDisciplinasPorId(+disciplinaParam).subscribe({
        next: (disciplina) => {
          this.formDisciplina.patchValue(disciplina);
        },
        error: (error) => {
          console.error('Erro ao buscar disciplina:', error);
        }
      });
    }

  }

  iniciarForm() {
    this.formDisciplina = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
      }
    );
  }

  cadastrar() {
    if (this.formDisciplina.valid) {

      if (this.editando) {
        this.disciplinaService.atualizarDisciplina(this.formDisciplina.value).subscribe({
          next: (disciplina) => {
            this.snackBar.open('Disciplina atualizada com sucesso!', 'Ok', { duration: 3000 });
            this.formDisciplina.reset();
            this.router.navigate(['/create']);
          },
          error: (error) => {
            console.error('Erro ao atualizar disciplina:', error);
            this.snackBar.open('Erro ao atualizar disciplina!', 'Fechar', { duration: 3000 });
            this.formDisciplina.reset();
          }
        });
        return;
      } else {
        this.disciplinaService.adicionarDisciplina(this.formDisciplina.value).subscribe({
          next: (disciplina) => {
            this.snackBar.open('Disciplina cadastrada com sucesso!', 'Ok', { duration: 3000 });
            this.formDisciplina.reset();
            this.router.navigate(['/create']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar disciplina:', error);
            this.snackBar.open('Erro ao cadastrar disciplina!', 'Fechar', { duration: 3000 });
            this.formDisciplina.reset();
          }
        });
      }
    } else {
      this.snackBar.open('Formulario inválido!', 'Ok', { duration: 3000 });
      this.formDisciplina.reset();
    }
  }
}