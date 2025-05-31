import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUsuario } from '../Interfaces/Usuario.interface';
import { Perfil } from '../Enums/Perfil.enum';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private readonly http: HttpClient) { }

   private url = 'https://roomflow-api.tccnapratica.com.br/usuario';

  getUsers() : Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.url + '/listar');
  }

  getUsersApproved() : Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.url + '/listar-ativos');
  }

  getProfessores(): Observable<IUsuario[]> {
  return this.http.get<IUsuario[]>(this.url + '/listar-ativos').pipe(
    map((usuarios : IUsuario[]) => {
      return usuarios.filter(usuario => usuario.perfil === Perfil.Professor);
    })
  );
}

  removerUsuario(id: number) : Observable<IUsuario> {
    return this.http.delete<IUsuario>(this.url + '/remover/' + id);
  }
  criarUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.url + '/adicionar', usuario);
  }
  
  aprovarUsuario(id: number): Observable<IUsuario> {
    return this.http.put<IUsuario>(this.url + '/aprovar/' + id, {});
  }
  
  rejeitarUsuario(id: number): Observable<IUsuario> {
    return this.http.put<IUsuario>(this.url + '/rejeitar/' + id, {});
  }

}
