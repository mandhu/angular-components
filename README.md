# NgxWorkspace

## About ## 
This is a angular material component for slide overlay panel from right;

## Setup ##

### Installation ###

```bash
$ ng add @angular/material
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
* Check [Documentation](https://github.com/mandhu/angular-material-components/blob/master/projects/mat-slide-panel/README.md)


## Theming

```scss
@import '~ngx-mat-slide-panel/src/lib/mat-slide-panel-theme.scss';

// Using the $theme variable from the pre-built theme you can call the theming function
@include mat-slide-panel-theme($theme);
```

## Example ##
* Check [Example project](https://github.com/mandhu/angular-material-components/tree/master/projects/mat-slide-panel)

