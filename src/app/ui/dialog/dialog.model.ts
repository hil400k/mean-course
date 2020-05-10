import { ComponentRef } from '@angular/core';

export interface IDialogConfig {
  state: boolean;
  component?: ComponentRef<any>;
  params?: any;
}
