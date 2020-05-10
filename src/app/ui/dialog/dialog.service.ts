import { ComponentRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDialogConfig } from './dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private state = false;
  private stateSubject: Subject<any> = new Subject<any>();
  public stateEmitter: Observable<any> = this.stateSubject.asObservable();

  hide() {
    this.state = false;
    this.emit({
      state: this.state
    });
  }

  show(component, params?) {
    this.state = true;
    this.emit({
      state: this.state,
      component,
      params
    });
  }

  emit(config: IDialogConfig) {
    this.stateSubject.next(config);
  }
}
