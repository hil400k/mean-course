import { Component, EventEmitter, Input, Output } from '@angular/core';

interface IPageChange {

}

@Component({
  selector: 'app-paginator',
  template: `
    <div>
      <button (click)="previous()">
        <span>
          <
        </span>
      </button>
      <span>
        {{currentPage + 1}}
      </span>
      <button (click)="next()">
        <span>
          >
        </span>
      </button>
    </div>
  `,
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() length: number;
  @Input() pageSize = 5;
  @Output() pageChange: EventEmitter<IPageChange> = new EventEmitter<IPageChange>();

  currentPage = 0;

  constructor(

  ) {

  }

  emitPageChange() {
    this.pageChange.emit({
      currentPage: this.currentPage
    });
  }

  next() {
    if (this.length > (this.currentPage + 1) * this.pageSize) {
      this.currentPage ++;
      this.emitPageChange();
    }
  }

  previous() {
    if (this.currentPage > 0) {
      this.currentPage --;
      this.emitPageChange();
    }
  }
}
