import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISala } from '../Interfaces/Sala.interface';
import { IMapa } from '../Interfaces/Mapa.interface';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  constructor(private readonly http: HttpClient) { }

  private url = 'https://roomflow-api.tccnapratica.com.br/sala';


  getSalas(): Observable<ISala[]> {
    return this.http.get<ISala[]>(this.url + '/listar');
  }

  getMapa() : Observable<IMapa[]> {
    return this.http.get<IMapa[]>('https://roomflow-api.tccnapratica.com.br/mapa/listar');
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

      buscarDadosFiltrados(data: Date, bloco?: number): Observable<IMapa[]> {
      // Formata a data no formato yyyy-MM-dd que é compatível com DateOnly
      const year = data.getFullYear();
      const month = (data.getMonth() + 1).toString().padStart(2, '0');
      const day = data.getDate().toString().padStart(2, '0');
      const dataStr = `${year}-${month}-${day}`;

      let url = `https://roomflow-api.tccnapratica.com.br/mapa/listar?data=${dataStr}`;

      if (bloco !== undefined) {
          url += `&bloco=${bloco}`;
      }

      return this.http.get<IMapa[]>(url);
  }
}