import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ISolicitarResetSenha {
  email: string;
}

export interface IResetarSenha {
  chaveResetSenha: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

export interface IAlterarSenha {
  senha: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

@Injectable({
  providedIn: 'root'
})
export class SegurancaService {

  private readonly url = 'https://roomflow-api.tccnapratica.com.br';

  constructor(private http: HttpClient) {}


  solicitarResetSenha(dados: ISolicitarResetSenha): Observable<any> {
    return this.http.post(`${this.url}/gerar-chave-reset-senha`, dados);
  }

  resetarSenha(dados: IResetarSenha): Observable<any> {
    return this.http.put(`${this.url}/resetar-senha`, dados);
  }

  alterarSenha(dados: IAlterarSenha): Observable<IAlterarSenha> {
    return this.http.put<IAlterarSenha>(`${this.url}/alterar-senha`, dados);
  }

}