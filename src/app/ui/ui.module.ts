import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion.component';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [
    AccordionComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccordionComponent,
    PaginatorComponent
  ]
})
export class UiModule { }
