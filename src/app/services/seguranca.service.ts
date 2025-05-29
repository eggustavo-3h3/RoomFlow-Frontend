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

  /**
   * Envia um e-mail com a chave de redefinição de senha
   */
  solicitarResetSenha(dados: ISolicitarResetSenha): Observable<any> {
    return this.http.post(`${this.url}/gerar-chave-reset-senha`, dados);
  }

  /**
   * Redefine a senha com a chave recebida por e-mail
   */
  resetarSenha(dados: IResetarSenha): Observable<any> {
    return this.http.put(`${this.url}/resetar-senha`, dados);
  }

  /**
   * Altera a senha estando logado (requer senha atual)
   */
  alterarSenha(dados: IAlterarSenha): Observable<any> {
    return this.http.put(`${this.url}/alterar-senha`, dados);
  }
}
