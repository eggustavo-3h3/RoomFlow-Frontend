import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { CardsSalaComponent } from '../principal/cards-sala/cards-sala.component';
import { SalaService } from '../../../services/sala.service';
import { ISala } from '../../../Interfaces/Sala.interface';
import { Status } from '../../../Enums/Status.enum';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from '../principal/principal.component';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoSala } from '../../../Enums/TipoSala.enum';
import { trigger, transition, style, animate } from '@angular/animations';

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
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AlterarMapaComponent implements OnInit {
  numSala: any;
  confirmarReserva() {
    throw new Error('Method not implemented.');
  }

  salas: ISala[] = [];
  salasFake: ISala[] = [];
  exibirmodal: boolean = false;
  snackBar = inject(MatSnackBar);

  formularioDeSalas: FormGroup = new FormGroup({});

  statusEnum = Status;
  statusOptions = [
    { label: 'Disponível', value: Status.Disponivel },
    { label: 'Reservada', value: Status.Reservada },
    { label: 'Indisponível', value: Status.Indisponivel },
  ];

  tipoOptions = [
    { label: 'Lab. Informatica', value: TipoSala.LabInformatica },
    { label: 'Lab. Quimica', value: TipoSala.LabQuimica },
    { label: 'Sala Comum', value: TipoSala.SalaComum },
  ]

  mostrarExcluirBotao: boolean = false;

  salasDisponiveis = 0;
  salasReservadas = 0;
  salasIndisponiveis = 0;
  exibirCard: any;

  constructor(
    private readonly _salaService: SalaService,
    private readonly formBuilder: FormBuilder,
  ) { }

  iniciaForm() {
    this.formularioDeSalas = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.maxLength(3)]],
      status: [null, Validators.required],
      tipoSala: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    //this.getSalas();
    this.getSalasFake();
    this.iniciaForm();
  }

  toggleModal() {
    this.formularioDeSalas.reset();
    this.exibirmodal = !this.exibirmodal;

  }

  atualizarContagens() {
    this.salasDisponiveis = this.salas.filter(s => s.status === Status.Disponivel).length;
    this.salasReservadas = this.salas.filter(s => s.status === Status.Reservada).length;
    this.salasIndisponiveis = this.salas.filter(s => s.status === Status.Indisponivel).length;
  }

  getSalas() {
    this._salaService.getSalas().subscribe({
      next: lista => {
        this.salas = lista;
        this.atualizarContagens();
      },
      error: erro => {
        console.log(erro.message);
      },
    });
  }

  getSalasFake() {
    this.salasFake = this._salaService.getSalasFake();
  }

  cadastrarSalas() {
    if (this.formularioDeSalas.invalid) {
      this.formularioDeSalas.markAllAsTouched();
      return;
    }

    const novaSala: ISala = {
      descricao: this.formularioDeSalas.value.descricao,
      status: this.formularioDeSalas.value.status,
      tipoSala: this.formularioDeSalas.value.tipo,
    };

    this._salaService.cadastrarSala(novaSala).subscribe({
      next: retorno => {
        this.salas.push(retorno);
        this.getSalas();
        this.toggleModal();
        this.formularioDeSalas.reset();
      },
      error: erro => {
        this.snackBar.open('Erro ao cadastrar sala', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }

  removerSala(id: number) {
    this._salaService.removerSala(id).subscribe({
      next: () => {
        this.snackBar.open('Sala removida com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.getSalas();
      },
      error: erro => {
        this.snackBar.open('Erro ao remover sala', 'Fechar', {
          duration: 3000,
        });
        console.error(erro);
      }
    });
  }
}
