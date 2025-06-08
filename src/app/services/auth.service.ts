import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../Enums/Perfil.enum';
import { IUsuario } from '../Interfaces/Usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://roomflow-api.tccnapratica.com.br/autenticar';

  constructor(private readonly http: HttpClient) {}

  logar(login: string, senha: string): Observable<string> {
    return this.http.post<string>(this.url, { login, senha });
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getIdDoUsuarioLogado(): string | null {
    const payload = this.decodeToken();
    if (!payload) return null;

    // Verifica os possíveis nomes de campo para o ID
    return payload.sub || payload.id || payload.Id || null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  getUsuario(): IUsuario | null {
    const payload = this.decodeToken();
    if (!payload) return null;

    return {
      statusUsuario: payload.StatusUsuario || '',
      id: payload.Id,
      nome: payload.Nome || '',
      login: payload.Login || '',
      senha: '',
      perfil:
        payload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || '',
    };
  }

  getNomeDoUsuarioLogado(): string {
    const usuario = this.getUsuario();
    return usuario ? usuario.nome : '';
  }

  getPerfil(): Perfil | null {
    const usuario = this.getUsuario();
    if (!usuario) return null;

    switch (usuario.perfil) {
      case 'Administrador':
        return Perfil.Administrador;
      case 'Professor':
        return Perfil.Professor;
      default:
        return null;
    }
  }

  usuarioEhProfessor(): boolean {
    return this.getPerfil() === Perfil.Professor;
  }

  usuarioEhAdministrador(): boolean {
    return this.getPerfil() === Perfil.Administrador;
  }
}
