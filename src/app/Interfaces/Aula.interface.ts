import { Bloco } from "../Enums/Bloco.enum";
import { IDisciplina } from "./Disciplina.interface";
import { ISala } from "./Sala.interface";
import { ITurma } from "./Turma.interface";
import { IUsuario } from "./Usuario.interface";

export interface IAula {
    id? : number;
    bloco : Bloco;
    disciplina : IDisciplina;
    sala : ISala;
    turma: ITurma;
    data : Date | string;
    professor: IUsuario;
}