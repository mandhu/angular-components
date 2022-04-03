import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatSlidePanelModule} from '../../projects/mat-slide-panel/src/public-api';
import {TestComponent} from './test/test.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ThaanaInputModule} from '../../projects/thaana-input/src/lib/thaana-input.module';
// import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatInputModule} from '@angular/material/input';
// import {ThaanaInputModule} from 'ngx-thaana-input';
// import {MatSlidePanelModule} from 'ngx-mat-slide-panel';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatSlidePanelModule} from 'mat-slide-panel';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    MatSlidePanelModule,
    BrowserAnimationsModule,
    ThaanaInputModule,
    // NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatBottomSheetModule,
    // MatDialogModule,
    MatAutocompleteModule,
    // ThaanaInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
