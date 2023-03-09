import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  declarations: [RegisterComponent],
  providers: [],
  exports: [RegisterComponent],
})
export class RegisterComponentModule {}
