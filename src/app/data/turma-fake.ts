import { ITurma } from "../Interfaces/Turma.interface";

import { Periodo } from "../Enums/Periodo.enum";
import { cursosFake } from "./curso-fake";

export const turmasFake: ITurma[] = [
  { id: 1, descricao: 'Turma A', curso: cursosFake[0].nome },
  { id: 2, descricao: 'Turma B', curso: cursosFake[1].nome },
  { id: 3, descricao: 'Turma C', curso: cursosFake[2].nome },
  { id: 4, descricao: 'Turma D', curso: cursosFake[3].nome },
  { id: 5, descricao: 'Turma E', curso: cursosFake[4].nome },
];