import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SegurancaService, ISolicitarResetSenha } from '../../../services/seguranca.service';

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
    CommonModule,
  ]
})
export class EsqueciASenhaComponent {
  formularioDeRecuperacao: FormGroup;
  esqueciSenhaService: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
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
      const dados: ISolicitarResetSenha = { email };

      this.esqueciSenhaService.solicitarResetSenha(dados).subscribe({
        next: (res: any) => {
            this.snackBar.open('Link enviado com sucesso!', 'Fechar', { duration: 3000 });

        },
        error: () => {
           this.snackBar.open('Erro ao enviar link. Verifique o e-mail informado.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
