import { Component, inject } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { IAlterarSenha, SegurancaService } from '../../../services/seguranca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [NavBarComponent,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatIcon
  ],
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  form: FormGroup;
  passwordAppears1 = false;
  passwordAppears2 = false;
  passwordAppears3 = false;

  snackBar = inject(MatSnackBar);
  router = inject(Router);

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

  
  togglePasswordVisibility1() {
    this.passwordAppears1 = !this.passwordAppears1;
  }
  togglePasswordVisibility2() {
    this.passwordAppears2 = !this.passwordAppears2;
  }
  togglePasswordVisibility3() {
    this.passwordAppears3 = !this.passwordAppears3;
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
        this.router.navigate(['/']);
        this.snackBar.open('Senha alterada com sucesso' , 'Ok', {
          duration: 3000
        })
      },
      error: (erro) => {
        console.error('Erro ao alterar senha:', erro);
      }
    });
  }
}