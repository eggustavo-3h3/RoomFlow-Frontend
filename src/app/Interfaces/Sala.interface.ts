import { Status } from "../Enums/Status.enum";

export interface ISala {
    id?: number;
    descricao: string;
    status: Status;
    tipo: string;
}