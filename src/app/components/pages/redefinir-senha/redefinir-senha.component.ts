import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { EsqueciSenhaService, IResetarSenha } from '../../../services/esqueci-senha.service';
import { ActivatedRoute } from '@angular/router';
import { SegurancaService } from '../../../services/seguranca.service';
@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NavBarComponent,
    //SegurancaService
  ],
  providers: [EsqueciSenhaService],
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {
  form: FormGroup;
  chaveResetSenha: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private esqueciSenhaService: EsqueciSenhaService
  ) {
    this.form = this.fb.group(
      {
        novaSenha: ['', Validators.required],
        confirmarSenha: ['', Validators.required]
      },
      { validators: this.validarSenhasIguais }
    );
  }

  ngOnInit(): void {
    this.chaveResetSenha = this.route.snapshot.queryParamMap.get('chave') || '';
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

      this.esqueciSenhaService.resetarSenha(dados).subscribe({
        next: (res) => console.log('Senha redefinida com sucesso', res),
        error: (err) => console.error('Erro ao redefinir senha', err)
      });
    }
  }
}
