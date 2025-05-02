import { Periodo } from "../Enums/Periodo.enum";

export interface ICurso {
  id? : number;
  nome: string;
  periodo: Periodo;
}