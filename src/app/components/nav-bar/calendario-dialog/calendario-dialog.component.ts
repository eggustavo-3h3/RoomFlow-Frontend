import { Component, Inject, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { SalaService } from '../../../services/sala.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bloco } from '../../../Enums/Bloco.enum';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { IMapa } from '../../../Interfaces/Mapa.interface';
import { firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'app-calendario-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatRadioModule,
    CommonModule,
  ],
  templateUrl: './calendario-dialog.component.html',
  styleUrls: ['./calendario-dialog.component.css'],
})
export class CalendarioDialogComponent {
  dataService: any;
  minDate: Date = new Date();

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CalendarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salaService: SalaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      data: [null, Validators.required],
      bloco: [{ value: null, disabled: true }, Validators.required],
    });

    this.form.get('data')?.valueChanges.subscribe((data: Date | null) => {
      const blocoControl = this.form.get('bloco');
      if (data) {
        blocoControl?.enable();
      } else {
        blocoControl?.disable();
      }
    });
  }

  blocoEnum = [
    { label: 'Bloco 1', value: Bloco.Primeiro },
    { label: 'Bloco 2', value: Bloco.Segundo },
    { label: 'Ambos', value: 0 },
  ];

  async aplicarFiltro() {
    const data = this.form.get('data')?.value;
    const bloco = this.form.get('bloco')?.value;

    this.salaService.buscarDadosFiltrados(data, bloco).subscribe({
      next: (salas: IMapa[]) => {
        this.dialogRef.close(salas);
        this.snackBar.open('Filtros aplicados com sucesso!', 'Fechar', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackBar.open('Erro ao carregar salas.', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }
}
