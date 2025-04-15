import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISala } from '../Interfaces/Sala.interface';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private readonly http: HttpClient) { }

  private url = 'https://roomflow-api.tccnapratica.com.br/sala/listar';

  getSalas() : Observable<ISala[]> {
    return this.http.get<ISala[]>(this.url);
  }
}
