import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-entitys',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './create-entitys.component.html',
  styleUrl: './create-entitys.component.css'
})
export class CreateEntitysComponent {

  @Input() cursosList: any[] = [];
  @Input() turmasList: any[] = [];
  @Input() disciplinasList: any[] = [];

  @Output() cursoDelete = new EventEmitter<any>();
  @Output() turmaDelete = new EventEmitter<any>();
  @Output() disciplinaDelete = new EventEmitter<any>();

  displayedColumnsCursos = ['nome', 'periodo', 'acoes'];
  displayedColumnsTurmas = ['descricao', 'curso', 'acoes'];
  displayedColumnsDisciplinas = ['nome', 'descricao', 'acoes'];

  onCursoDelete(curso: any) {
    this.cursoDelete.emit(curso);
  }

  onTurmaDelete(turma: any) {
    this.turmaDelete.emit(turma);
  }

  onDisciplinaDelete(disciplina: any) {
    this.disciplinaDelete.emit(disciplina);
  }

}
