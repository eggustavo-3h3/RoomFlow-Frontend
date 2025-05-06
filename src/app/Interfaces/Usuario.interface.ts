import { Perfil } from "../Enums/Perfil.enum";

export interface IUsuario {
    status: string;
    id: number;
    nome: string;
    login: string;
    senha: string;
    perfil: Perfil;
}