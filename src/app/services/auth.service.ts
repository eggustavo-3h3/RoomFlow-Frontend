import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../Enums/Perfil.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  private url = 'https://roomflow-api.tccnapratica.com.br/autenticar';

  logar(login: string, senha: string): Observable<string> {
    return this.http.post<string>(this.url, { login, senha });
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getNomeDoUsuarioLogado(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.Nome || payload.sub || null;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  usuarioEhProfessor(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.perfil === Perfil.Professor; // 2
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return false;
    }
  }
  
}