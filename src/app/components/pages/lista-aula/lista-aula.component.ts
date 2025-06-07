import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { PerfilPipe } from '../../../Pipes/perfil.pipe';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-aula',
  standalone: true,
  imports: [
    NavBarComponent,
    MatIconModule,
    MatTableModule,
    AngularMaterialModule,
    CommonModule
  ],
  templateUrl: './lista-aula.component.html',
  styleUrl: './lista-aula.component.css'
})
export class ListaAulaComponent implements OnInit {
  aulas: any[] = [];
  displayedColumns: string[] = ['curso', 'disciplina', 'acoes'];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.carregarAulas();
  }

  carregarAulas() {
    this.http.get<any[]>('https://roomflow-api.tccnapratica.com.br/aula/listar')
      .subscribe({
        next: (dados) => this.aulas = dados,
        error: (erro) => console.error('Erro ao carregar aulas:', erro)
      });
  }

  excluirAula(id: string) {
  if (!confirm('Tem certeza que deseja excluir esta aula?')) return;

  this.http.delete(`https://roomflow-api.tccnapratica.com.br/aula/remover/${id}`)
    .subscribe({
      next: () => {
        this.snackBar.open('Aula excluída com sucesso', 'Fechar', { duration: 3000 });
        this.carregarAulas();
      },
      error: (erro) => {
        console.error('Erro ao excluir aula:', erro);
        this.snackBar.open('Erro ao excluir aula', 'Fechar', { duration: 3000 });
      }
    });
}
}