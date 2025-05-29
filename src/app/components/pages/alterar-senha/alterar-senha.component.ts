import { Component } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { SegurancaService } from '../../../services/seguranca.service';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [NavBarComponent,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    //SegurancaService
  ],
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        senhaAtual: ['', Validators.required],
        novaSenha: ['', Validators.required],
        confirmarSenha: ['', Validators.required]
      },
      { validators: this.validarSenhasIguais }
    );
  }

  validarSenhasIguais(group: FormGroup) {
    const novaSenha = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return novaSenha === confirmar ? null : { senhasDiferentes: true };
  }

  alterarSenha() {
    if (this.form.valid) {
      const dados = this.form.value;
      // Chame aqui sua API de alteração de senha
      console.log('Dados para alterar senha:', dados);
      // this.authService.alterarSenha(dados).subscribe(...)
    }
  }
}

