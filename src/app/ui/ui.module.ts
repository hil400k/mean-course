import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion.component';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AccordionComponent,
    PaginatorComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccordionComponent,
    PaginatorComponent,
    SpinnerComponent
  ]
})
export class UiModule { }
