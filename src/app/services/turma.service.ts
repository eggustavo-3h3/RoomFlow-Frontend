import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITurma, ITurmaAdicionar, ITurmaAtualizar } from '../Interfaces/Turma.interface';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(private readonly http: HttpClient) { }

   private url = 'https://roomflow-api.tccnapratica.com.br/turma';

  getTurmas() : Observable<ITurma[]> {
    return this.http.get<ITurma[]>(this.url + '/listar');
  }

  getTurmaById(id: string): Observable<ITurma> {
    return this.http.get<ITurma>(this.url + '/obter/' + id);
  }

  adicionarTurma(turma: ITurmaAdicionar) : Observable<ITurma> {
    return this.http.post<ITurma>(this.url + '/adicionar', turma);
  }

  atualizarTurma(turma: ITurmaAtualizar): Observable<ITurma> {
  if (!turma.id) {
    throw new Error('ID da turma é obrigatório para atualização');
  }
  return this.http.put<ITurma>(`${this.url}/atualizar`, turma);
}

  removerTurma(id: string) : Observable<ITurma> {
    return this.http.delete<ITurma>(this.url + '/remover/' + id);
  }

}
