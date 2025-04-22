import { Status } from "../Enums/Status.enum";

export interface ISala {
    id?: number;
    numero: string;
    status: Status;
    tipo: string;
}