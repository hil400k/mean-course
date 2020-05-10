import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion.component';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AccordionComponent,
    PaginatorComponent,
    SpinnerComponent,
    DialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccordionComponent,
    PaginatorComponent,
    SpinnerComponent,
    DialogComponent
  ]
})
export class UiModule { }
