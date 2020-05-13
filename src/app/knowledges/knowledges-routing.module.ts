import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgesPageComponent } from './knowledges-page/knowledges-page.component';

const routes: Routes = [
  { path: 'knowledges', component: KnowledgesPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class KnowledgesRoutingModule {

}
