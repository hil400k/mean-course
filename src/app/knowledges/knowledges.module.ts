import { NgModule } from '@angular/core';
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';
import { UiModule } from '../ui/ui.module';
import { KnowledgesPageComponent } from './knowledges-page/knowledges-page.component';
import { KnowledgesRoutingModule } from './knowledges-routing.module';

// // to restrict languages import; set useValue to { languages: getHighlightLanguages() }
// export function getHighlightLanguages() {
//   return {
//     typescript: () => import('highlight.js/lib/languages/typescript'),
//     css: () => import('highlight.js/lib/languages/css'),
//     html: () => import('highlight.js/lib/languages/xml'),
//   };
// }

@NgModule({
  imports: [
    KnowledgesRoutingModule,
    UiModule,
    HighlightModule
  ],
  declarations: [
    KnowledgesPageComponent
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        lineNumbers: true
      } as HighlightOptions
    }
  ],
})
export class KnowledgesModule { }
