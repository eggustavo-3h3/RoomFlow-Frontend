import { Status } from "../Enums/Status.enum";
import { TipoSala } from "../Enums/TipoSala.enum";

export interface ISala {
tipo: any;
    id?: number;
    descricao: string;
    status: Status;
    tipoSala: TipoSala;
}