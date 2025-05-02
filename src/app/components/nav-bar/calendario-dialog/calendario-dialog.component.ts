import { Component, Inject, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-calendario-dialog',
  standalone: true,
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  encapsulation: ViewEncapsulation.None,
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
  ],
  templateUrl: './calendario-dialog.component.html'
})
export class CalendarioDialogComponent {
  dataSelecionada: Date | null = null;
  blocoSelecionado: string = 'bloco1';
  selected: Date | null = null;

  onDateChange(event: any) {
    this.dataSelecionada = event.value;
    console.log('Data selecionada:', this.dataSelecionada);
  }

  constructor(
    public dialogRef: MatDialogRef<CalendarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  abrirBloco() {
    if (this.blocoSelecionado === 'bloco1') {
      console.log('Abrindo Bloco 1...');
    } else if (this.blocoSelecionado === 'bloco2') {
      console.log('Abrindo Bloco 2...');
    } else {
      console.warn('Nenhum bloco selecionado');
    }
  }

  aplicarFiltro() {
   
    console.log('Aplicando filtro...');
    console.log('Data selecionada:', this.dataSelecionada);
    console.log('Bloco selecionado:', this.blocoSelecionado);
  }

  isDataSelecionada(): boolean {
    return this.dataSelecionada !== null;
  }
}
