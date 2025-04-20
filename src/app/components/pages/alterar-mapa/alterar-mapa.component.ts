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
    ReactiveFormsModule
],
  templateUrl: './alterar-mapa.component.html',
  styleUrl: './alterar-mapa.component.css'
})
export class AlterarMapaComponent implements OnInit {

  salas: ISala[] = [];
  exibirmodal: boolean = false;
  snackBar = inject(MatSnackBar);

  formularioDeSalas: FormGroup = new FormGroup({});

  statusEnum = Status;
  statusOptions = [
    { label: 'Disponível', value: Status.Disponivel },
    { label: 'Reservada', value: Status.Reservada },
    { label: 'Indisponível', value: Status.Indisponivel },
  ];

  mostrarExcluirBotao: boolean = false;


  constructor(
    private readonly _salaService: SalaService,
    private readonly formBuilder: FormBuilder,
  ) { }

  iniciaForm() {
    this.formularioDeSalas = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.maxLength(20)]],
      status: [null, Validators.required]
    });
  }


  ngOnInit(): void {
    this.getSalas();
    this.iniciaForm();
  }

  salasDisponiveis = this.salas.filter((salas) => salas.status === Status.Disponivel).length;

  salasReservadas = this.salas.filter((salas) => salas.status === Status.Reservada).length;

  salasIndisponiveis = this.salas.filter((salas) => salas.status === Status.Indisponivel).length;

  toggleModal() {
    this.exibirmodal = !this.exibirmodal;
  }

  getSalas() {
    this._salaService.getSalas().subscribe({
      next: lista => {
        this.salas = lista;
      },
      error: erro => {
        console.log(erro.message);
      },
    });
  }

  cadastrarSalas() {
    if (this.formularioDeSalas.invalid) {
      this.formularioDeSalas.markAllAsTouched();
      return;
    }

    const novaSala: ISala = {
      descricao: this.formularioDeSalas.value.descricao,
      status: this.formularioDeSalas.value.status,
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
