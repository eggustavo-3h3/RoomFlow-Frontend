import { Status } from "../Enums/Status.enum";

export interface ISala {
tipo: any;
    id?: number;
    descricao: string;
    status: Status;
    tipoSala: string;
}