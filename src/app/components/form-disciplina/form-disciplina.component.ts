import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaService } from '../../services/disciplina.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-disciplina',
  standalone: true,
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    NavBarComponent,
  ],
  templateUrl: './form-disciplina.component.html',
  styleUrl: './form-disciplina.component.css'
})
export class FormDisciplinaComponent implements OnInit, OnDestroy {

  formDisciplina: FormGroup = new FormGroup({});
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  disciplinaService = inject(DisciplinaService);
  editando: boolean = false;

  private subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
  ) { }

  voltar() {
    this.router.navigate(['/create']);
  }

  ngOnInit(): void {
    this.iniciarForm();

    const disciplinaParam = this.route.snapshot.paramMap.get('id');

    if (disciplinaParam) {
      this.editando = true; 
      const sub = this.disciplinaService.getDisciplinasPorId(disciplinaParam).subscribe({
        next: (disciplina) => {
          this.formDisciplina.patchValue(disciplina);
        },
        error: (error) => {
          console.error('Erro ao buscar disciplina:', error);
        }
      });
      this.subscription.add(sub);
    }
  }

  iniciarForm() {
    this.formDisciplina = this.formBuilder.group(
      {
        id: [''],
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
      }
    );
  }

  cadastrar() {
    if (this.formDisciplina.valid) {

      if (this.editando) {
        const sub = this.disciplinaService.atualizarDisciplina(this.formDisciplina.value).subscribe({
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
        this.subscription.add(sub);
        return;
      } else {
        const sub = this.disciplinaService.adicionarDisciplina(this.formDisciplina.value).subscribe({
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
        this.subscription.add(sub);
      }
    } else {
      this.snackBar.open('Formulario inválido!', 'Ok', { duration: 3000 });
      this.formDisciplina.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
