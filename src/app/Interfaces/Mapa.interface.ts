import { Bloco } from "../Enums/Bloco.enum";
import { Periodo } from "../Enums/Periodo.enum";
import { Status } from "../Enums/Status.enum";
import { TipoSala } from "../Enums/TipoSala.enum";

export interface IMapa {
  salaId: string;
  numeroSala: number;
  descricao: string;
  statusSala: Status;
  tipoSala: TipoSala;
  flagExibirNumeroSala: boolean;
  aula?: MapaAulaDto | null;
}

export interface MapaAulaDto {
  disciplina?: MapaDisciplinaDto | null;
  curso?: MapaCursoDto | null;
  turma?: MapaTurmaDto | null;
  professor?: MapaProfessorDto | null;
  data: string | Date;
  diaSemana: string;
  dataInicio: string | Date;
  dataFim: string | Date;
  bloco: Bloco;
}

export interface MapaDisciplinaDto {
  nome: string;
  descricao: string;
}

export interface MapaCursoDto {
  nome: string;
  periodo: Periodo;
}

export interface MapaTurmaDto {
  descricao: string;
}

export interface MapaProfessorDto {
  nome: string;
}
