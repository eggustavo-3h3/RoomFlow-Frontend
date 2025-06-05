import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class AlterarMapaComponent implements OnInit, OnDestroy {
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
  exibirCard: boolean = false;
  salaParaEdicao: ISala | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly _salaService: SalaService,
    private readonly formBuilder: FormBuilder
  ) {}

  iniciaForm() {
    this.formularioDeSalas = this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.maxLength(6), Validators.required]],
      numeroSala: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      tipoSala: [null, Validators.required],
      statusSala: [null, Validators.required],
      flagExibirNumeroSala: [false],
    });
  }

  ngOnInit(): void {
    this.iniciaForm();
    this.getMapa();
    this.atualizarContagens();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleModal() {
    this.formularioDeSalas.reset({
      id: '',
      descricao: '',
      numeroSala: null,
      tipoSala: null,
      statusSala: null,
      flagExibirNumeroSala: false 
    });
    this.salaParaEdicao = null;
    this.exibirmodal = !this.exibirmodal;
  }

  atualizarContagens() {
    this.salasDisponiveis = this.mapa.filter(
      (s) => s.statusSala.toString() === 'Disponivel'
    ).length;
    this.salasReservadas = this.mapa.filter(
      (s) => s.statusSala.toString() === 'Ocupada'
    ).length;
    this.salasIndisponiveis = this.mapa.filter(
      (s) => s.statusSala.toString() === 'Indisponivel'
    ).length;
  }

  getMapa() {
    const sub = this._salaService.getMapa().subscribe({
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
    this.subscriptions.add(sub);
  }

  cadastrarSalas() {
    if (this.formularioDeSalas.invalid) {
      this.formularioDeSalas.markAllAsTouched();
      return;
    }

    const formValue = this.formularioDeSalas.value;

    if (this.salaParaEdicao) {
      const salaAtualizada = {
        id: this.salaParaEdicao.id!,
        descricao: formValue.descricao,
        statusSala: formValue.statusSala,
        tipoSala: formValue.tipoSala,
        numeroSala: formValue.numeroSala,
        flagExibirNumeroSala: formValue.flagExibirNumeroSala,
      };

      const sub = this._salaService.atualizarSala(salaAtualizada).subscribe({
        next: (retorno) => {
          this.snackBar.open('Sala editada com sucesso', 'Fechar', {
            duration: 3000,
          });
          this.getMapa();
          this.toggleModal();
          this.formularioDeSalas.reset();
        },
        error: () => {
          this.snackBar.open('Erro ao editar sala', 'Fechar', {
            duration: 3000,
          });
          this.toggleModal();
        },
      });
      this.subscriptions.add(sub);
    } else {
      const novaSala = {
        descricao: formValue.descricao,
        statusSala: formValue.statusSala,
        tipoSala: formValue.tipoSala,
        numeroSala: formValue.numeroSala,
        flagExibirNumeroSala: formValue.flagExibirNumeroSala,
      };

      const sub = this._salaService.cadastrarSala(novaSala).subscribe({
        next: (retorno) => {
            this.snackBar.open('Sala cadastrada com sucesso', 'Fechar', {
              duration: 3000,
            });
          this.salas.push(retorno);
          this.getMapa();
          this.toggleModal();
          this.formularioDeSalas.reset();
        },
        error: () => {
          this.snackBar.open('Erro ao cadastrar sala', 'Fechar', {
            duration: 3000,
          });
        },
      });
      this.subscriptions.add(sub);
    }
  }

  removerSala(id: string) {
    const sub = this._salaService.removerSala(id).subscribe({
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
    this.subscriptions.add(sub);
  }

  abrirModalEdicao(salaId: string) {
    const sala = this.mapa.find((m) => m.salaId === salaId);

    if (sala) {
      this.salaParaEdicao = {
        id: sala.salaId,
        descricao: sala.descricao,
        numeroSala: sala.numeroSala,
        tipoSala: sala.tipoSala,
        statusSala: sala.statusSala,
        flagExibirNumeroSala: sala.flagExibirNumeroSala,
      };

      this.formularioDeSalas.patchValue({
        id: sala.salaId,
        descricao: sala.descricao,
        numeroSala: sala.numeroSala,
        tipoSala: TipoSala[sala.tipoSala as keyof unknown],
        statusSala: Status[sala.statusSala as keyof unknown],
        flagExibirNumeroSala: sala.flagExibirNumeroSala,
      });
      this.exibirmodal = true;
    }
  }
}