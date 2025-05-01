import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-calendario-dialog',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Escolha uma ação</h2>
    <mat-dialog-content style="display: flex; flex-direction: column; gap: 10px;">
      <button mat-raised-button color="primary" (click)="abrirCalendario()">Abrir Calendário</button>
      <button mat-raised-button color="accent" (click)="abrirBloco()">Bloco</button>
      <button mat-raised-button color="warn" (click)="aplicarFiltro()">Filtrar</button>
    </mat-dialog-content>
  `
})
export class CalendarioDialogComponent {
  constructor(public dialogRef: MatDialogRef<CalendarioDialogComponent>) {}

  abrirCalendario() {
    console.log('Abrindo calendário...');
  }
  
  abrirBloco() {
    console.log('Abrindo bloco...');
  }
  
  aplicarFiltro() {
    console.log('Aplicando filtro...');
  }
}
