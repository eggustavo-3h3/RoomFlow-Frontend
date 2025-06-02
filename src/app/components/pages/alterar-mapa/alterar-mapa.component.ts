import { Component, inject, Input, OnInit } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { CardsSalaComponent } from '../principal/cards-sala/cards-sala.component';
import { SalaService } from '../../../services/sala.service';
import { ISala } from '../../../Interfaces/Sala.interface';
import { Status } from '../../../Enums/Status.enum';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoSala } from '../../../Enums/TipoSala.enum';
import { IMapa } from '../../../Interfaces/Mapa.interface';

@Component({
  selector: 'app-alterar-mapa',
  standalone: true,
  imports: [
    NavBarComponent,
    MatCardModule,
    CardsSalaComponent,
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './alterar-mapa.component.html',
  styleUrl: './alterar-mapa.component.css',
})
export class AlterarMapaComponent implements OnInit {
  salas: ISala[] = [];
  exibirmodal: boolean = false;
  snackBar = inject(MatSnackBar);
  mapa: IMapa[] = [];

  formularioDeSalas: FormGroup = new FormGroup({});

  statusEnum = Status;
  statusOptions = [
    { label: 'Disponível', value: Status.Disponivel },
    { label: 'Indisponível', value: Status.Indisponivel },
  ];

  tipoOptions = [
    { label: 'Lab. Informatica', value: TipoSala.LabInformatica },
    { label: 'Lab. Quimica', value: TipoSala.LabQuimica },
    { label: 'Sala Comum', value: TipoSala.SalaComum },
  ];

  mostrarExcluirBotao: boolean = false;

  salasDisponiveis = 0;
  salasReservadas = 0;
  salasIndisponiveis = 0;
  exibirCard: any;
  salaParaEdicao: ISala | null = null;

  constructor(
    private readonly _salaService: SalaService,
    private readonly formBuilder: FormBuilder
  ) {}

  iniciaForm() {
    this.formularioDeSalas = this.formBuilder.group(
      {
        descricao: ['', [Validators.maxLength(6)]],
        numero: [null],
        tipoSala: [null, Validators.required],
        statusSala: [null, Validators.required],
        flagExibirNumeroSala: [null],
      },
      { validators: this.descricaoOuNumeroValidator }
    );
  }

  ngOnInit(): void {
    this.getMapa();
    this.iniciaForm();
    this.atualizarContagens();
  }

  toggleModal() {
    this.formularioDeSalas.reset();
    this.salaParaEdicao = null;
    this.exibirmodal = !this.exibirmodal;
  }

  atualizarContagens() {
    this.salasDisponiveis = this.mapa.filter(
      (s) => s.statusSala === Status.Disponivel
    ).length;
    this.salasReservadas = this.mapa.filter(
      (s) => s.statusSala === Status.Reservada
    ).length;
    this.salasIndisponiveis = this.mapa.filter(
      (s) => s.statusSala === Status.Indisponivel
    ).length;
  }

  getMapa() {
    this._salaService.getMapa().subscribe({
      next: (lista) => {
        this.mapa = lista;
        this.atualizarContagens();
      },
      error: (erro) => {
        console.log(erro.message);
        this.snackBar.open(
          'Erro ao carregar salas, volte novamente mais tarde!',
          'Fechar',
          {
            duration: 3000,
          }
        );
      },
    });
  }

  descricaoOuNumeroValidator(form: FormGroup) {
    const descricao = form.get('descricao')?.value;
    const numero = form.get('numero')?.value;

    if (!descricao && !numero) {
      return { descricaoOuNumeroObrigatorio: true };
    }

    return null;
  }

  cadastrarSalas() {
    if (this.formularioDeSalas.invalid) {
      this.formularioDeSalas.markAllAsTouched();
      return;
    }

    const novaSala: ISala = {
      id: this.salaParaEdicao?.id,
      descricao: this.formularioDeSalas.value.descricao,
      statusSala: this.formularioDeSalas.value.statusSala,
      tipoSala: this.formularioDeSalas.value.tipoSala,
      numeroSala: this.formularioDeSalas.value.numero,
      flagExibirNumeroSala: this.formularioDeSalas.value.flagExibirNumeroSala,
    };

    if (this.salaParaEdicao) {
      this._salaService.atualizarSala(novaSala).subscribe({
        next: (retorno) => {
          this.snackBar.open('Sala editada com sucesso', 'Fechar', {
            duration: 3000,
          });
          this.getMapa();
          this.toggleModal();
          this.formularioDeSalas.reset();
        },
        error: (erro) => {
          this.snackBar.open('Erro ao editar sala', 'Fechar', {
            duration: 3000,
          });
          this.toggleModal();
        },
      });
    } else {
      this._salaService.cadastrarSala(novaSala).subscribe({
        next: (retorno) => {
          this.salas.push(retorno);
          this.getMapa();
          this.toggleModal();
          this.formularioDeSalas.reset();
        },
        error: (erro) => {
          this.snackBar.open('Erro ao cadastrar sala', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  removerSala(id: string) {
    this._salaService.removerSala(id).subscribe({
      next: () => {
        this.snackBar.open('Sala removida com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.getMapa();
      },
      error: (erro) => {
        this.snackBar.open('Erro ao remover sala', 'Fechar', {
          duration: 3000,
        });
        console.error(erro);
      },
    });
  }

  abrirModalEdicao(salaId: string) {
    const sala = this.mapa.find((s) => s.salaId === salaId);

    if (!sala) {
      this.snackBar.open('Sala não encontrada!', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    this.salaParaEdicao = { ...sala };

    this.formularioDeSalas.patchValue({
      descricao: sala.descricao,
      numero: sala.numeroSala,
      tipoSala: sala.tipoSala,
      statusSala: sala.statusSala,
      flagExibirNumeroSala: sala.flagExibirNumeroSala,
    });

    this.exibirmodal = true;
  }
}
