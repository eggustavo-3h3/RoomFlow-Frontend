import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EsqueciSenhaService, IRequestResetSenha } from '../../../services/esqueci-senha.service';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private esqueciSenhaService: EsqueciSenhaService
    ) {
    this.formularioDeRecuperacao = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }

  enviarLinkRecuperacao() {
    if (this.formularioDeRecuperacao.valid) {
      const email = this.formularioDeRecuperacao.value.email as string;
      const dados: IRequestResetSenha = { email };

      this.esqueciSenhaService.solicitarResetSenha(dados).subscribe({
        next: (res: any) => {
          console.log('Link de recuperação enviado com sucesso:', res);

        },
        error: (err: any) => {
          console.error('Erro ao enviar link de recuperação:', err);

        }
      });
    }
  }
}
