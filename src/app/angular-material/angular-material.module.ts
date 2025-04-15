import { NgModule } from "@angular/core";
import {MatInput} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    MatTableModule,
    MatInput,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [
    MatTableModule,
    MatInput,
    MatFormFieldModule,
    MatButtonModule
  ],
  
  providers: [],
})

export class AngularMaterialModule { }