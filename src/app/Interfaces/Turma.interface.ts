import { Bloco } from '../Enums/Bloco.enum';
import { ICurso } from './Curso.interface';

export interface ITurma {
  cursoId: string;
  id?: string;
  descricao: string;
}

export interface ITurmaAdicionar {
  descricao: string;
  cursoId: string;
}

export interface ITurmaAtualizar {
  id: string;
  descricao: string;
  cursoId: string;
}