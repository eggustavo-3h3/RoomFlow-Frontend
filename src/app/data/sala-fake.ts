import { Perfil } from "../Enums/Perfil.enum";
import { Status } from "../Enums/Status.enum";
import { TipoSala } from "../Enums/TipoSala.enum";
import { ISala } from "../Interfaces/Sala.interface";

export const salaFake: ISala[] = [
  {
    descricao: 'Sala 101',
    status: Status.Disponivel,
    tipoSala: TipoSala.LabInformatica,
  },
  {
    descricao: 'Sala 102',
    status: Status.Indisponivel,
    tipoSala: TipoSala.LabQuimica,
  },
  {
    descricao: 'Sala 103',
    status: Status.Reservada,
    tipoSala: TipoSala.LabInformatica,
  },
  {
    descricao: 'Sala 104',
    status: Status.Disponivel,
    tipoSala: TipoSala.SalaComum,
  }
] 