import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formularioDeUsuario: FormGroup = new FormGroup({});
  passwordApears = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: Router,
    private readonly snackBar: MatSnackBar
  ) { }

  iniciaForm() {
    this.formularioDeUsuario = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  ngOnInit() {
    this.iniciaForm();
  }
  voltar() {
    this.route.navigate(['/']);
  }


  togglePasswordVisibility() {
    this.passwordApears = !this.passwordApears;
  }

  logar() {
    this.authService.logar(this.formularioDeUsuario.value.login, this.formularioDeUsuario.value.senha,).subscribe({
      next: token => {
        if (token) {
          this.authService.addToken(token);
          this.route.navigate(['principal']);
          console.log('logado');
        }
      },
      error: erro => {
        if (erro.status === 400) {
          this.snackBar.open('Usuário ou senha incorretos', 'Fechar', { duration: 3000 });
          this.formularioDeUsuario.reset();
          console.clear();
        } else {
          this.snackBar.open('Erro Inesperado ao tentar fazer login', 'Ok', { duration: 3000 });
          console.clear();
        }
      }
    });
  }

}