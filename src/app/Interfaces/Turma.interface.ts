import { Bloco } from "../Enums/Bloco.enum";
import { ICurso } from "./Curso.interface";

export interface ITurma {
    cursoId: any;
    id?: number;
    bloco : Bloco;
    descricao: string;
    curso: ICurso;
}