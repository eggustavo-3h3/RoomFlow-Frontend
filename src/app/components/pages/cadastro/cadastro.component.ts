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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isMobile: boolean = false;
  snackBar = inject(MatSnackBar);

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
     window.addEventListener('resize', this.checkMobileMode.bind(this));
  }
  checkMobileMode() {
  this.isMobile = window.innerWidth <= 768;
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
          this.snackBar.open('Cadastro concluído. Aguarde a autorização do Administrador', 'Ok', {
            duration: 5000
          });
          this.router.navigate(['/']);
          this.formularioDeUsuario.reset();
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário:', err);
        },
      });
    }
  }
}
