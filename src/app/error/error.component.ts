import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  @Input() data: { message: string; };
}
