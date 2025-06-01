import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISala } from '../Interfaces/Sala.interface';
import { Status } from '../Enums/Status.enum'; // ajuste o caminho conforme sua estrutura

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  constructor(private readonly http: HttpClient) { }

  private url = 'https://roomflow-api.tccnapratica.com.br/sala';

  private mapStatus = {
    Disponivel: Status.Disponivel,
    Reservada: Status.Reservada,
    Ocupada: Status.Reservada,
    Indisponivel: Status.Indisponivel
  };

  getSalas(): Observable<ISala[]> {
    return this.http.get<any[]>(this.url + '/listar').pipe(
      map(salasApi => 
        salasApi.map(sala => ({
          ...sala,
          id: sala.salaId,
          statusSala: this.mapStatus[sala.statusSala as keyof typeof this.mapStatus]
        }))
      )
    );
  }

  listSalasById(id : string) : Observable<ISala> {
    return this.http.get<ISala>(this.url + '/listar/' + id);
  }

  cadastrarSala(sala: ISala): Observable<ISala> {
    return this.http.post<ISala>(this.url + '/adicionar', sala);
  }

  atualizarSala(sala: ISala) : Observable<ISala> {
    return this.http.put<ISala>(`${this.url}/atualizar`, sala);
  }

  removerSala(id: string): Observable<void>  {
    return this.http.delete<void>(`${this.url}/remover/${id}`)
  }
}
