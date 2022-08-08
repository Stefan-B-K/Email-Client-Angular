import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SpinnerComponent } from './spinner/spinner.component';
import { Modal } from './modal/modal';


@NgModule({
  declarations: [InputComponent, SpinnerComponent, Modal],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, SpinnerComponent, Modal]
})
export class SharedModule {}
