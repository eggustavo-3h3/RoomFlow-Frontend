import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISala } from '../Interfaces/Sala.interface';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  getDisciplinas() {
    throw new Error('Method not implemented.');
  }

  constructor(private readonly http: HttpClient) { }

  private url = 'https://roomflow-api.tccnapratica.com.br/sala';


  getSalas(): Observable<ISala[]> {
    return this.http.get<ISala[]>(this.url + '/listar');
  }

  listSalasById(id : string) : Observable<ISala> {
    return this.http.get<ISala>(this.url + '/listar/' + id);
  }

  cadastrarSala(sala: ISala): Observable<ISala> {
    return this.http.post<ISala>(this.url + '/adicionar', sala);
  }

  atualizarSala(sala: ISala) : Observable<ISala> {
    return this.http.put<ISala>( `${this.url}/atualizar`, sala);
  }

  removerSala(id: string): Observable<void>  {
    return this.http.delete<void>(`${this.url}/remover/${id}`)
  }
}