import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../../Interfaces/Usuario.interface';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MatRadioModule } from '@angular/material/radio';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    MatRadioModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

  usuarios: IUsuario[] = [];

  formularioDeUsuario: FormGroup = new FormGroup({});
  usuarioService: any;

  constructor(private formbuilder: FormBuilder) { }
  
  inicializaFormulario() {
    this.formularioDeUsuario = this.formbuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      perfil: [null, [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.inicializaFormulario();
  }

  SubmitForm() {
    if (this.formularioDeUsuario.valid) {
      const novoUsuario = this.formularioDeUsuario.value;
  
      this.usuarioService.criarUsuario(novoUsuario).subscribe({
        next: () => {
          console.log('Usuário cadastrado com sucesso');
          this.formularioDeUsuario.reset();
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar usuário:', err);
        }
      });
    }
  }
}
