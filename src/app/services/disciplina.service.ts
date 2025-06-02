import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDisciplina } from '../Interfaces/Disciplina.interface';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private readonly http: HttpClient) { }

   private url = 'https://roomflow-api.tccnapratica.com.br/disciplina';

  getDisciplinas() : Observable<IDisciplina[]> {
    return this.http.get<IDisciplina[]>(this.url + '/listar');
  }

  getDisciplinasPorId(id: string) : Observable<IDisciplina> {
    return this.http.get<IDisciplina>(this.url + '/obter/' + id);
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
