import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";

@Component({
  selector: 'app-gerador',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NavBarComponent
],
  templateUrl: './gerador.component.html',
  styleUrls: ['./gerador.component.css'],
})
export class GeradorComponent {
  form: FormGroup;
  resultado: any = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      disciplinaId: ['', Validators.required],
      cursoId: ['', Validators.required],
      salaId: ['', Validators.required],
      turmaId: ['', Validators.required],
      data: [null, Validators.required],
      professorId: ['', Validators.required],
      diaSemana: [null, [Validators.required, Validators.min(0), Validators.max(6)]],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      bloco: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.resultado = this.form.value;
      console.log('Dados preenchidos:', this.resultado);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
