import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatSlidePanelModule } from '../../projects/mat-slide-panel/src/public-api';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ThaanaInputModule} from '../../projects/thaana-input/src/lib/thaana-input.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    MatSlidePanelModule,
    BrowserAnimationsModule,
    ThaanaInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
