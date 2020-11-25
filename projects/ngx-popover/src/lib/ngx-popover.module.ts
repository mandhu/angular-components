import { NgModule } from '@angular/core';
import { NgxPopoverComponent } from './ngx-popover.component';
import { NgxPopoverDirective } from './ngx-popover.directive';



@NgModule({
  declarations: [
    NgxPopoverComponent,
    NgxPopoverDirective
  ],
  imports: [
  ],
  exports: [
    NgxPopoverComponent,
    NgxPopoverDirective
  ]
})
export class NgxPopoverModule { }
