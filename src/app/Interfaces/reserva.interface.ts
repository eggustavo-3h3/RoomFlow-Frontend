export interface IReserva {
  disciplinaId: string;
  cursoId: string;
  salaId: string | undefined;
  turmaId: string;
  data: string | Date;
  professorId: string | null;
  bloco: number;
}