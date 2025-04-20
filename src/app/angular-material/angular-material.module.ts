import { NgModule } from "@angular/core";
import {MatInput} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    MatTableModule,
    MatInput,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatTableModule,
    MatInput,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  
  providers: [],
})

export class AngularMaterialModule { }