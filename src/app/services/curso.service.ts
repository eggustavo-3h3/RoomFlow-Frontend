import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurso } from '../Interfaces/Curso.interface';
import { cursosFake } from '../data/curso-fake';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private readonly cursosFake: ICurso[] = cursosFake;

  constructor(private readonly http: HttpClient) { }

  private url = 'https://roomflow-api.tccnapratica.com.br/curso';

  getCursos(): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(this.url + '/listar');
  }

  getCursosFake() {
    return this.cursosFake;
  }

  getCursoById(id: number): Observable<ICurso> {
    return this.http.get<ICurso>(this.url + '/listar/' + id);
  }

  atualizarCurso(curso: ICurso): Observable<ICurso> {
    return this.http.put<ICurso>(this.url + '/atualizar', curso);
  }

  adicionarCurso(curso: ICurso): Observable<ICurso> {
    return this.http.post<ICurso>(this.url + '/adicionar', curso);
  }

  removerCurso(id: number): Observable<ICurso> {
    return this.http.delete<ICurso>(this.url + '/remover/' + id);
  }
}