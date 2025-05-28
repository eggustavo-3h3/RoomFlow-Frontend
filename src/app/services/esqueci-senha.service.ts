import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRequestResetSenha {
  email: string;
}

export interface IResetarSenha {
  chaveResetSenha: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

@Injectable({
  providedIn: 'root'
})
export class EsqueciSenhaService {

  private readonly url = 'https://roomflow-api.tccnapratica.com.br/resetar-senha';

  constructor(private readonly http: HttpClient) {}

  solicitarResetSenha(dados: IRequestResetSenha): Observable<any> {
    return this.http.post(`${this.url}`, dados);
  }

  resetarSenha(dados: IResetarSenha): Observable<any> {
    return this.http.put(`${this.url}`, dados);
  }
}

