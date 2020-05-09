import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `
    <div class="accordion">
      <div class="accordion-header">
        <button class="switch-button" (click)="changeState()">
          <span *ngIf="state" class="state-sign">-</span>
          <span *ngIf="!state" class="state-sign">+</span>
        </button>

        <ng-content select=".accordion-header-content"></ng-content>
      </div>
      <div class="accordion-body" *ngIf="state">
        <ng-content select=".accordion-header-body"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  state: boolean = false;
  constructor() {

  }

  changeState() {
    this.state = !this.state;
  }
}
