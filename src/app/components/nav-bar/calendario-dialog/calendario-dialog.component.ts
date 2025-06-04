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
import { Router } from '@angular/router';
import { SalaService } from '../../../services/sala.service';
import { ISala } from '../../../Interfaces/Sala.interface';

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
  templateUrl: './calendario-dialog.component.html',
  styleUrls: ['./calendario-dialog.component.css'],
})
export class CalendarioDialogComponent {
  dataSelecionada: Date | null = null;
  blocoSelecionado: string = 'bloco1';
  selected: Date | null = null;
  dataService: any;
  minDate: Date = new Date();

onDateChange(date: Date) {
  this.dataSelecionada = date;
  console.log('Data selecionada:', this.dataSelecionada);
}

  constructor(
  public dialogRef: MatDialogRef<CalendarioDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private salaService: SalaService,
  private router: Router
) {}

abrirBloco() {
  if (this.blocoSelecionado === 'bloco1') {
    this.router.navigate(['/bloco1']);
  } else if (this.blocoSelecionado === 'bloco2') {
    this.router.navigate(['/bloco2']);
  } else {
    console.warn('Nenhum bloco selecionado');
  }
}

aplicarFiltro() {
  if (this.isDataSelecionada() && this.blocoSelecionado) {
    this.salaService.buscarDadosFiltrados(this.dataSelecionada!, this.blocoSelecionado)
      .subscribe({
        next: (data: ISala[]) => {
          console.log('Salas filtradas:', data);
          this.dialogRef.close(data);
        },
        error: err => console.error('Erro ao buscar salas:', err)
      });
  } else {
    console.warn('Selecione uma data e um bloco antes de aplicar o filtro');
  }
}


  isDataSelecionada(): boolean {
    return this.dataSelecionada !== null;
  }
}
