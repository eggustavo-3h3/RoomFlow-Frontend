import { ICurso } from "./Curso.interface";

export interface ITurma {
    id?: number;
    descricao: string;
    curso: ICurso;
}