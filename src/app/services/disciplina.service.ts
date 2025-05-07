import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../Interfaces/Usuario.interface';
import { ITurma } from '../Interfaces/Turma.interface';
import { IDisciplina } from '../Interfaces/Disciplina.interface';
import { disciplinaFake } from '../data/disciplina-fake';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  private readonly disciplinasFake: IDisciplina[] = disciplinaFake;

  constructor(private readonly http: HttpClient) { }

   private url = 'https://roomflow-api.tccnapratica.com.br/disciplina';

  getDisciplinas() : Observable<IDisciplina[]> {
    return this.http.get<IDisciplina[]>(this.url + '/listar');
  }

  getDisciplinasFake() {
    return this.disciplinasFake;
  }

  getDisciplinasPorId(id: number) : Observable<IDisciplina> {
    return this.http.get<IDisciplina>(this.url + '/listar/' + id);
  }

  atualizarDisciplina(disciplina: IDisciplina): Observable<IDisciplina> {
    return this.http.put<IDisciplina>(this.url + '/atualizar', disciplina);
  }


  adicionarDisciplina(disciplina: IDisciplina) : Observable<IDisciplina> {
    return this.http.post<IDisciplina>(this.url + '/adicionar', disciplina);
  }

  removerDisciplina(id: number) : Observable<IDisciplina> {
    return this.http.delete<IDisciplina>(this.url + '/remover/' + id);
  }

}
