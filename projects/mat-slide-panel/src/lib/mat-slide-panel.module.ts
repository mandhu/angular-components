import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCommonModule } from '@angular/material/core';
import { PortalModule } from '@angular/cdk/portal';
import { MatSlidePanelContainer } from './mat-slide-panel-container';


@NgModule({
  declarations: [MatSlidePanelContainer],
  imports: [
    OverlayModule,
    MatCommonModule,
    PortalModule
  ],
  exports: [MatSlidePanelContainer,  MatCommonModule]
})
export class MatSlidePanelModule { }
