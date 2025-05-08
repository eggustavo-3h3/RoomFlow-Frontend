import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITurma } from '../Interfaces/Turma.interface';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(private readonly http: HttpClient) { }

   private url = 'https://roomflow-api.tccnapratica.com.br/turma';

  getTurmas() : Observable<ITurma[]> {
    return this.http.get<ITurma[]>(this.url + '/listar');
  }

  getTurmaById(id: number): Observable<ITurma> {
    return this.http.get<ITurma>(this.url + '/listar/' + id);
  }

  adicionarTurma(turma: ITurma) : Observable<ITurma> {
    return this.http.post<ITurma>(this.url + '/adicionar', turma);
  }

  atualizarTurma(turma: ITurma): Observable<ITurma> {
    return this.http.put<ITurma>(this.url + '/atualizar', turma);
  }

  removerTurma(id: number) : Observable<ITurma> {
    return this.http.delete<ITurma>(this.url + '/remover/' + id);
  }

}
