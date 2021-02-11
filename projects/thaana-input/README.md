# Angular Thaana Input
```bash
npm install ngx-thaana-input --save
```

## Version ## 
ThaanaInput | Angular |
--- | --- |
0.0.1 | 11+ |


## Usage

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ThaanaInputModule } from 'ngx-thaana-input'; // <-- import module

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ThaanaInputModule // <-- add here
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

/*****************/

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<input type="text" thaanaInput/>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
}


```
