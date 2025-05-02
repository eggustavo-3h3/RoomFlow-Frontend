import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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


  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarForm();
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
    } else {
      this.snackBar.open('Formulario inválido!', 'Ok', { duration: 3000 });
      this.formDisciplina.reset();
    }
  }
}