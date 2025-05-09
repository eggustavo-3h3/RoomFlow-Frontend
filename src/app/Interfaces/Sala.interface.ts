import { TipoSala } from "../Enums/TipoSala.enum";

export interface ISala {
    status: string;
    id?: number;
    descricao: string;
    statusSala: number;
    tipoSala: TipoSala;
}