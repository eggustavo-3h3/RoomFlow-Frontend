import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ICurso } from '../../Interfaces/Curso.interface';
import { CursoService } from '../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaService } from '../../services/turma.service';
import { ITurmaAtualizar, ITurmaAdicionar } from '../../Interfaces/Turma.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-turma',
  standalone: true,
  imports: [
    AngularMaterialModule,
    NavBarComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './form-turma.component.html',
  styleUrl: './form-turma.component.css'
})
export class FormTurmaComponent implements OnInit, OnDestroy {

  formTurma: FormGroup = new FormGroup({});
  cursos: ICurso[] = [];
  cursoService = inject(CursoService);
  turmaService = inject(TurmaService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  editando = false;

  private subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute
  ) { }
  
  voltar() {
    this.router.navigate(['/create']);
  }


  ngOnInit(): void {
    this.iniciarForm();
    this.getCursos();

    const turmaParam = this.route.snapshot.paramMap.get('id');
    if (turmaParam) {
      this.editando = true;
      this.carregarTurma(turmaParam);
    }
  }

  iniciarForm() {
    this.formTurma = this.formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      curso: ['', Validators.required],
    });
  }

  getCursos() {
    const sub = this.cursoService.getCursos().subscribe({
      next: (cursos) => this.cursos = cursos,
      error: (error) => console.error('Erro ao buscar cursos:', error)
    });
    this.subscription.add(sub);
  }

  carregarTurma(id: string) {
    const sub = this.turmaService.getTurmaById(id).subscribe({
      next: (turma) => {
        this.formTurma.patchValue({
          id: turma.id,
          descricao: turma.descricao,
          curso: turma.cursoId
        });
      },
      error: (error) => console.error('Erro ao buscar turma:', error)
    });
    this.subscription.add(sub);
  }

  cadastrar() {
    if (this.formTurma.valid) {
      const formValue = this.formTurma.value;

      if (this.editando) {
        const turmaParaAtualizar: ITurmaAtualizar = {
          id: formValue.id,
          descricao: formValue.descricao,
          cursoId: formValue.curso
        };

        const sub = this.turmaService.atualizarTurma(turmaParaAtualizar).subscribe({
          next: () => {
            this.snackBar.open('Turma atualizada com sucesso!', 'Ok', { duration: 3000 });
            this.formTurma.reset();
            this.router.navigate(['/create']);
          },
          error: (error) => {
            console.error('Erro ao atualizar turma:', error);
            this.snackBar.open('Erro ao atualizar turma!', 'Fechar', { duration: 3000 });
          }
        });
        this.subscription.add(sub);

      } else {
        const turmaParaAdicionar: ITurmaAdicionar = {
          descricao: formValue.descricao,
          cursoId: formValue.curso
        };

        const sub = this.turmaService.adicionarTurma(turmaParaAdicionar).subscribe({
          next: () => {
            this.snackBar.open('Turma cadastrada com sucesso!', 'Ok', { duration: 3000 });
            this.formTurma.reset();
            this.router.navigate(['/create']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar turma:', error);
            this.snackBar.open('Erro ao cadastrar turma!', 'Fechar', { duration: 3000 });
          }
        });
        this.subscription.add(sub);
      }
    } else {
      this.snackBar.open('Formulário inválido!', 'Ok', { duration: 3000 });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
