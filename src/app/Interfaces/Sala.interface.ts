import { TipoSala } from "../Enums/TipoSala.enum";
import { IAula } from "./Aula.interface";

export interface ISala {
  id?: string;
  descricao: string;
  statusSala: number;
  tipoSala: TipoSala;
  numero: number;

  aula?: IAula;
}