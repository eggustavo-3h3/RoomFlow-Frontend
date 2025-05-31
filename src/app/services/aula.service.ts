import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAula } from '../Interfaces/Aula.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  adicionar(dadosReserva: { disciplinaId: any; cursoId: any; salaId: string | undefined; turmaId: number | undefined; data: string; professorId: number | undefined; diaSemana: number; dataInicio: string; dataFim: string; bloco: any; }) {
    throw new Error('Method not implemented.');
  }

  private url = 'https://roomflow-api.tccnapratica.com.br/aula';

  constructor(private http: HttpClient) {}

  criarAula(aula: IAula): Observable<IAula> {
    return this.http.post<IAula>(this.url, aula);
  }
  getAulasPorSalaEData(salaId: string, data: string): Observable<IAula[]> {
  const url = `${this.url}?salaId=${salaId}&data=${data}`;
  return this.http.get<IAula[]>(url);
}
}
