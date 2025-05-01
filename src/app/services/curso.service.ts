import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurso } from '../Interfaces/Curso.interface';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private readonly http: HttpClient) { }

   private url = 'https://roomflow-api.tccnapratica.com.br/curso';

  getCursos() : Observable<ICurso[]> {
    return this.http.get<ICurso[]>(this.url + '/listar');
  }

  removerCurso(id: number) : Observable<ICurso> {
    return this.http.delete<ICurso>(this.url + '/remover/' + id);
  }

}
