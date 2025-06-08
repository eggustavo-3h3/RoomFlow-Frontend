import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IResetarSenha, SegurancaService } from '../../../services/seguranca.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NavBarComponent,
    MatIconModule,
  ],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {
  form: FormGroup;
  chaveResetSenha: string = '';
  esconderNovaSenha: boolean = true;
  esconderConfirmarSenha: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private segurancaService: SegurancaService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        novaSenha: ['', [Validators.required, Validators.minLength(8)]],
        confirmarSenha: ['', Validators.required]
      },
      { validators: this.validarSenhasIguais }
    );
  }

  ngOnInit(): void {
  this.chaveResetSenha = this.route.snapshot.paramMap.get('chavereset') || '';
}

  validarSenhasIguais(group: FormGroup) {
    const nova = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return nova === confirmar ? null : { senhasDiferentes: true };
  }

  alterarSenha() {
    if (this.form.valid && this.chaveResetSenha) {
      const { novaSenha, confirmarSenha } = this.form.value;
      const dados: IResetarSenha = {
        chaveResetSenha: this.chaveResetSenha,
        novaSenha,
        confirmarNovaSenha: confirmarSenha
      };

      this.segurancaService.resetarSenha(dados).subscribe({
        next: () => {
          this.snackBar.open('Senha redefinida com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          const msg = err.error?.mensagem || 'Erro ao redefinir senha. Verifique o link.';
          this.snackBar.open(msg, 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}