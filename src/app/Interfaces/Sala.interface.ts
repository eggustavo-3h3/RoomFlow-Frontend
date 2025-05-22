import { TipoSala } from "../Enums/TipoSala.enum";

export interface IReserva {
  professor: string;
  materia: string;
  turma: string;
  data: string;
}

export interface ISala {
  numSala: any;
  status: string;
  id?: number;
  descricao: string;
  statusSala: number;
  tipoSala: TipoSala;

  reserva?: IReserva;
}