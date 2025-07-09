import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatSlidePanelContainer } from './mat-slide-panel-container';
import {MatCommonModule} from '@angular/material/core';


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
