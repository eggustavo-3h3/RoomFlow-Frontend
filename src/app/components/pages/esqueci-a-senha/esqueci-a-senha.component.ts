import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-esqueci-a-senha',
  standalone: true,
  templateUrl: './esqueci-a-senha.component.html',
  styleUrl: './esqueci-a-senha.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class EsqueciASenhaComponent {
  formularioDeRecuperacao: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioDeRecuperacao = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviarLinkRecuperacao() {
    if (this.formularioDeRecuperacao.valid) {
      const email = this.formularioDeRecuperacao.value.email;
      console.log('Enviar link para:', email);
      // Aqui você chama o serviço que envia o e-mail de recuperação
    }
  }
}
