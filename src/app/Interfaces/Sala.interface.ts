import { TipoSala } from "../Enums/TipoSala.enum";

export interface ISala {
    id?: number;
    descricao: string;
    statusSala: number;
    tipoSala: TipoSala;
}