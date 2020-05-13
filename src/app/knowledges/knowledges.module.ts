import { NgModule } from '@angular/core';
import { UiModule } from '../ui/ui.module';
import { KnowledgesPageComponent } from './knowledges-page/knowledges-page.component';
import { KnowledgesRoutingModule } from './knowledges-routing.module';

@NgModule({
  imports: [
    KnowledgesRoutingModule,
    UiModule
  ],
  declarations: [
    KnowledgesPageComponent
  ]
})
export class KnowledgesModule { }
