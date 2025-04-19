import { Status } from "../Enums/Status.enum";

export interface ISala {
numero: any;
    id?: number;
    descricao: string;
    status : Status;
}