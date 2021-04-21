# NgxMatSlidePanel

# Installation
```bash
  npm install ngx-mat-slide-panel
```

## About ## 
This is an angular (V10+) material component for slide overlay panel from left / right;

Most of the API is same as [MatBottomSheet](https://material.angular.io/components/bottom-sheet/api)


## Version ## 
NgxMatSlidePanel | Angular |
--- | --- |
0.7 | 10+ |
0.8+ | 11+ |


## Usage

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MatSlidePanelModule } from 'ngx-mat-slide-panel'; // <-- import module

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSlidePanelModule // <-- add here
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
import { MatSlidePanel } from 'ngx-mat-slide-panel'; // <-- import
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-workspace';

  constructor(private slidePanel: MatSlidePanel) {

  }

  open() {
    this.slidePanel.open(TestComponent, {
        data: {name: 'Test'},
        slideFrom: 'left' // default is 'right'
    });
  }
}

/*****************/

// test.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SLIDE_PANEL_DATA } from 'ngx-mat-slide-panel'; // <-- import

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(@Inject(MAT_SLIDE_PANEL_DATA) public data) { }

  ngOnInit(): void {
  }

}

```



## Theming

```scss
@import '~ngx-mat-slide-panel/src/lib/mat-slide-panel-theme.scss';

// Using the $theme variable from the pre-built theme you can call the theming function
@include mat-slide-panel-theme($theme);
```

## Types
```typescript
export class MatSlidePanelConfig<D = any> {
  /** The view container to place the overlay for the mat slide panel into. */
  viewContainerRef?: ViewContainerRef;

  /** Extra CSS classes to be added to the mat slide panel container. */
  panelClass?: string | string[];

  /** Text layout direction for the mat slide panel. */
  direction?: Direction;

  /** Data being injected into the child component. */
  data?: D | null = null;

  /** Whether the mat slide panel has a backdrop. */
  hasBackdrop?: boolean = true;

  /** Custom class for the backdrop. */
  backdropClass?: string;

  /** Whether the user can use escape or clicking outside to close the mat slide panel. */
  disableClose?: boolean = false;

  /** Aria label to assign to the mat slide panel element. */
  ariaLabel?: string | null = null;

  /**
   * Whether the mat slide panel should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation?: boolean = true;

  /** Whether the mat slide panel should focus the first focusable element on open. */
  autoFocus?: boolean = false;

  /**
   * Whether the mat slide panel should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus?: boolean = true;

  /** Scroll strategy to be used for the mat slide panel. */
  scrollStrategy?: ScrollStrategy;

  /** Slide from which side of viewport. */
  slideFrom?: 'left' | 'right' = 'right';
}
```
