import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: Router,
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

  logar() {
    this.authService.logar(this.formularioDeUsuario.value.login, this.formularioDeUsuario.value.senha,).subscribe({
      next: token => {
        if (token) {
          this.authService.addToken(token);
          this.route.navigate(['principal']);
          console.log('logado');
          
        } else {
          alert('Usuario ou senha estão incorretos');
        }
      },
      error: erro => {
        alert('deu erro');
      }
    });
  }
  
}
