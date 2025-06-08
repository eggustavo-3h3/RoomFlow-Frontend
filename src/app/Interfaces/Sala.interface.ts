import { TipoSala } from "../Enums/TipoSala.enum";
import { IAula } from "./Aula.interface";

export interface ISala {
  id?: string;
  descricao: string;
  tipoSala: TipoSala;
  numeroSala: number;
  flagExibirNumeroSala : boolean;
  //aula?: IAula;
}