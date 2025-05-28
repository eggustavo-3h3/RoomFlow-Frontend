import { Routes } from '@angular/router';
import { InicialComponent } from './components/pages/inicial/inicial.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PrincipalComponent } from './components/pages/principal/principal.component';
import { EsqueciASenhaComponent } from './components/pages/esqueci-a-senha/esqueci-a-senha.component';
import { CadastroComponent } from './components/pages/cadastro/cadastro.component';
import { GerenciamentoComponent } from './components/pages/gerenciamento/gerenciamento.component';
import { AlterarSenhaComponent } from './components/pages/alterar-senha/alterar-senha.component';
import { AlterarMapaComponent } from './components/pages/alterar-mapa/alterar-mapa.component';
import { perfilGuard } from './guards/perfil.guard';
import { Perfil } from './Enums/Perfil.enum';
import { SolicitacaoComponent } from './components/pages/solicitacao/solicitacao.component';
import { CreateEntitysComponent } from './components/pages/create-entitys/create-entitys.component';
import { FormCursoComponent } from './components/form-curso/form-curso.component';
import { FormDisciplinaComponent } from './components/form-disciplina/form-disciplina.component';
import { FormTurmaComponent } from './components/form-turma/form-turma.component';
import { RedefinirSenhaComponent } from './components/pages/redefinir-senha/redefinir-senha.component';

export const routes: Routes = [

    { path: '', component: InicialComponent },
    { path: 'login', component: LoginComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: 'esqueci', component: EsqueciASenhaComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'redefinir', component: RedefinirSenhaComponent},

    {
        path: 'create', component: CreateEntitysComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'solicitacao', component: SolicitacaoComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'formCurso', component: FormCursoComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'formCurso/:id', component: FormCursoComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'formDisciplina', component: FormDisciplinaComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'formDisciplina/:id', component: FormDisciplinaComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'formTurma', component: FormTurmaComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'formTurma/:id', component: FormTurmaComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'gerenciamentoUsuarios', component: GerenciamentoComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },
    {
        path: 'alterar-senha', component: AlterarSenhaComponent,
        canActivate: [perfilGuard([Perfil.Administrador, Perfil.Professor])]
    },
    {
        path: 'alterar-mapa', component: AlterarMapaComponent,
        canActivate: [perfilGuard([Perfil.Administrador])]
    },

    { path: '**', redirectTo: '', pathMatch: 'full' }

];
