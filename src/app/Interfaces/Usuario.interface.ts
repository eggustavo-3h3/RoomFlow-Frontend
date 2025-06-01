import { Perfil } from "../Enums/Perfil.enum";
import { StatusUsuario } from "../Enums/StatusUsuario";

export interface IUsuario {
    statusUsuario: StatusUsuario;
    id?: number;
    nome: string;
    login: string;
    senha: string;
    perfil: Perfil | string;
}