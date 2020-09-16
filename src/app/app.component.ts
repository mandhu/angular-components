import { Component } from '@angular/core';
import { MatSlidePanel } from 'projects/mat-slide-panel/src/public-api';
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
      data: {name: 'Text'}
    });
  }
}
