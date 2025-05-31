import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../Enums/Perfil.enum';
import { IUsuario } from '../Interfaces/Usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUsuario(): IUsuario | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    const usuario: IUsuario = {
      status: payload.Status || '',     
      id: payload.Id,                    
      nome: payload.Nome || '',
      login: payload.Login || '',
      senha: '',                        
      perfil: payload.Perfil           
    };

    return usuario;
  } catch (error) {
    console.error('Erro ao decodificar token para obter usuário:', error);
    return null;
  }
}

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
      return payload?.Perfil === Perfil.Professor; // 2
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return false;
    }
  }
}