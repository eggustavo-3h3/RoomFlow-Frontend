import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PerfilPipe } from "../../../Pipes/perfil.pipe";
//import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [NavBarComponent,
    MatIconModule,
    MatTableModule, 
    PerfilPipe,
    //MatTooltipModule
    ],
  templateUrl: './solicitacao.component.html',
  styleUrl: './solicitacao.component.css'
})
export class SolicitacaoComponent implements OnInit {
// falta chamar na api
  solicitacoes = [
    { id: 1, login: 'prof.joao@gmail.com', nome: 'João Silva', perfil: 2 },
    { id: 2, login: 'admin.maria@gmail.com', nome: 'Maria Souza', perfil: 1 }
  ];

  displayedColumns: string[] = ['nome','login', 'perfil', 'acoes'];

  constructor() {}

  ngOnInit(): void {}

  aceitarSolicitacao(user: any) {
    console.log('Solicitação aceita:', user);
    // Aqui você pode chamar o serviço para aprovar a solicitação
  }

  rejeitarSolicitacao(user: any) {
    console.log('Solicitação rejeitada:', user);
    // Aqui você pode chamar o serviço para recusar a solicitação
  }
}

