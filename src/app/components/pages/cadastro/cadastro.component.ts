import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUsuario } from '../../../Interfaces/Usuario.interface';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MatRadioModule } from '@angular/material/radio';
import { Perfil } from '../../../Enums/Perfil.enum';
import { UsuarioService } from '../../../services/usuario.service';
import { StatusUsuario } from '../../../Enums/StatusUsuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    MatRadioModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent implements OnInit {
  usuarios: IUsuario[] = [];

  perfil = [
    { label: 'Administrador', value: Perfil.Administrador },
    { label: 'Professor', value: Perfil.Professor },
  ];

  formularioDeUsuario: FormGroup = new FormGroup({});
  usuarioService = inject(UsuarioService);

  constructor(private formbuilder: FormBuilder, private router: Router) {}

  inicializaFormulario() {
    this.formularioDeUsuario = this.formbuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(250)]],
      login: ['', [Validators.email, Validators.required]],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      perfil: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  voltar() {
    this.router.navigate(['/']);
  }

  SubmitForm() {
    if (this.formularioDeUsuario.valid) {
      const novoUsuario = {
        ...this.formularioDeUsuario.value,
        statusUsuario: StatusUsuario.Pendente, // <- adiciona o status fixo
      };

      console.log(novoUsuario);

      this.usuarioService.criarUsuario(novoUsuario).subscribe({
        next: () => {
          console.log('Usuário cadastrado com sucesso');
          this.formularioDeUsuario.reset();
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar usuário:', err);
        },
      });
    }
  }
}
