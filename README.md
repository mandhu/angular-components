# NgxWorkspace

## About ## 

This is a angular material component for slide overlay panel from right;
## Setup ##

### Installation ###

```bash
$ npm install ngx-mat-slide-panel -- save
```

### Inject ###


```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MatSlidePanelModule } from 'ngx-mat-slide-panel';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSlidePanelModule // <-- here
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

## Documentation ##
* Visit [Documentation](https://github.com/mandhu/angular-material-components/tree/master/projects/mat-slide-panel)
