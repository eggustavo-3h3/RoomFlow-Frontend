import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISala } from '../Interfaces/Sala.interface';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private readonly http: HttpClient) { }

  private url = 'https://roomflow-api.tccnapratica.com.br/sala';


  getSalas(): Observable<ISala[]> {
    return this.http.get<ISala[]>(this.url + '/listar');
  }

  cadastrarSala(sala: ISala): Observable<ISala> {
    return this.http.post<ISala>(this.url + '/adicionar', sala);
  }

  removerSala(id: number): Observable<void>  {
    return this.http.delete<void>(`${this.url}/remover/${id}`)
  }
}
