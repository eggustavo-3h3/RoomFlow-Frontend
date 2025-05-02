import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Periodo } from '../../Enums/Periodo.enum';
import { PeriodoPipe } from "../../Pipes/periodo.pipe";
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-form-curso',
  standalone: true,
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    PeriodoPipe,
    NavBarComponent
],
  templateUrl: './form-curso.component.html',
  styleUrl: './form-curso.component.css'
})
export class FormCursoComponent implements OnInit {

  formCurso: FormGroup = new FormGroup({});
  periodos = [Periodo.MANHA, Periodo.TARDE, Periodo.NOITE];


  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.formCurso = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        periodo: [null, Validators.required],
      }
    );
  }

  cadastrar() {
    console.log(this.formCurso.value);
  }

}
