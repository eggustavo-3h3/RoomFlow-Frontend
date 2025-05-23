import { TipoSala } from "../Enums/TipoSala.enum";

export interface IReserva {
bloco: any;
  professor: string;
  materia: string;
  turma: string;
  data: string;
}

export interface ISala {
  turma: any;
  disciplina: any;
  professor: any;
  numSala: any;
  status: string;
  id?: string;
  descricao: string;
  statusSala: number;
  tipoSala: TipoSala;

  reserva?: IReserva;
}