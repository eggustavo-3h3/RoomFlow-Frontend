import { Perfil } from "../Enums/Perfil.enum";

export interface IUsuario {
    id?: number;
    nome: string;
    login: string;
    senha: string;
    perfil: Perfil;
}