import { Component } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-esqueci-a-senha',
    standalone: true,
    templateUrl: './esqueci-a-senha.component.html',
    styleUrl: './esqueci-a-senha.component.css',
    imports: [NavBarComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class EsqueciASenhaComponent {
    formularioDeRecuperacao: FormGroup;

  constructor(private fb: FormBuilder) {
    // Criando o formulário com validação
    this.formularioDeRecuperacao = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Validação para o e-mail
    });
  }

  // Método chamado quando o botão "Enviar Link de Recuperação" é clicado
  recuperarSenha() {
    if (this.formularioDeRecuperacao.valid) {
      const email = this.formularioDeRecuperacao.value.email;
      console.log('Solicitação de recuperação enviada para:', email);

    
    } else {
      console.log('Formulário inválido');
    }
  }
}
