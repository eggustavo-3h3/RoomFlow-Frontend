import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAula } from '../Interfaces/Aula.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private readonly apiUrl = 'https://roomflow-api.tccnapratica.com.br/aula';

  constructor(private http: HttpClient) {}

  criarAula(aula: IAula): Observable<IAula> {
    return this.http.post<IAula>(this.apiUrl, aula);
  }
}
