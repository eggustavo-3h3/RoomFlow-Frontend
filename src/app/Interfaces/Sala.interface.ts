import { TipoSala } from "../Enums/TipoSala.enum";

export interface ISala {
  bloco: string;
  id?: string;
  descricao: string;
  statusSala: number;
  tipoSala: TipoSala;
  numero: number;
}