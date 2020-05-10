import {
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  styleUrls: ['./dialog.component.scss'],
  template: `
    <div *ngIf="state" class="overlay" (click)="hide($event)">
      <div class="dialog">
        <template #dialogViewContainer></template>
      </div>
    </div>
  `
})
export class DialogComponent implements OnInit {
  state = false;
  componentRef: ComponentRef<any>;
  @ViewChild('dialogViewContainer', { read: ViewContainerRef }) container;

  constructor(
    private dialogService: DialogService,
    private resolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dialogService.stateEmitter
      .subscribe((config) => {
        this.state = config.state;
        this.cdRef.detectChanges();
        if (config.component) {
          this.createComponent(config.component, config.params);
        }
      });
  }

  createComponent(component, params) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);
    Object.assign(this.componentRef.instance, params);
  }

  hide(e) {
    if (e.target.className === 'overlay') {
      this.dialogService.hide();
    }
  }
}
