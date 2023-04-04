import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
];


@NgModule({
  declarations: [],
  imports: [MATERIAL, FormsModule, ReactiveFormsModule],
  exports: [MATERIAL, FormsModule, ReactiveFormsModule],
})
export class SharedModule { }
