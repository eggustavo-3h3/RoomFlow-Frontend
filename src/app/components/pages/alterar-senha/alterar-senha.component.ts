import { Component } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { IAlterarSenha, SegurancaService } from '../../../services/seguranca.service';

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

  constructor(
    private fb: FormBuilder,
    private segurancaService: SegurancaService
    ) {
    this.form = this.fb.group(
      {
        senhaAtual: ['', Validators.required],
        novaSenha: ['', Validators.required],
        confirmarSenha: ['', Validators.required],

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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const formValue = this.form.value;
  
    const dados: IAlterarSenha = {
      senha: formValue.senhaAtual,
      novaSenha: formValue.novaSenha,
      confirmarNovaSenha: formValue.confirmarSenha
    };
  
    this.segurancaService.alterarSenha(dados).subscribe({
      next: () => {
        console.log('Senha alterada com sucesso.');
      },
      error: (erro) => {
        console.error('Erro ao alterar senha:', erro);
      }
    });
  }
}