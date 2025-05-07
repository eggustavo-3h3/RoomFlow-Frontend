import { Periodo } from "../Enums/Periodo.enum";
import { ICurso } from "../Interfaces/Curso.interface";

export const cursosFake: ICurso[] = [
  { id: 1, nome: 'Engenharia Civil', periodo: Periodo.MANHA },
  { id: 2, nome: 'Administração', periodo: Periodo.NOITE },
  { id: 3, nome: 'Direito', periodo: Periodo.NOITE },
  { id: 4, nome: 'Análise de Sistemas', periodo: Periodo.TARDE },
  { id: 5, nome: 'Educação Física', periodo: Periodo.NOITE },
];