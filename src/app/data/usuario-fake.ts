import { Perfil } from "../Enums/Perfil.enum";
import { IUsuario } from "../Interfaces/Usuario.interface";

export const usuariosFake: IUsuario[] = [
  {
    login: 'admin@gmail.com',
    nome: 'Admin',
    senha: 'admin123',
    perfil: Perfil.Administrador,
    status: 'Aprovado',
  },
  {
    login: 'professor@gmail.com',
    nome: 'Professor',
    senha: 'prof123',
    perfil: Perfil.Professor,
    status: 'Pendente',
  },
  {
    login: 'rivaldo@gmail.com',
    nome: 'rivaldo',
    senha: 'rivaldo123',
    perfil: Perfil.Professor,
    status: 'Aprovado',
  },
  {
    login: 'cristianoRonaldo@gmail.com',
    nome: 'cristianoRonaldo',
    senha: 'cristianoRonaldo123',
    perfil: Perfil.Administrador,
    status: 'Aprovado',
  }
] 