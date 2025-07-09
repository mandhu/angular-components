import {Component, ElementRef, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {AppService} from './app.service';
import {MatSlidePanel} from '../../projects/mat-slide-panel/src/public-api';
import {TestComponent} from './test/test.component';

// import {MatSlidePanel} from 'mat-slide-panel';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'ngx-workspace';
  form: UntypedFormGroup;
  banks = [];
  @ViewChild('input') input: ElementRef;

  constructor(
    private slidePanel: MatSlidePanel,
    private fb: UntypedFormBuilder,
    private service: AppService,
  ) {
    this.form = this.fb.group({
      filter: null
    });

    this.form.get('filter').valueChanges.subscribe(value => {
      console.log({value});
    });
    // this.form.get('groupB.name').valueChanges.subscribe(value => {
    //   console.log({value});
    // });
    // this.form.get('age').valueChanges.pipe(delay(10)).subscribe(value => {
    //   console.log({value});
    // });

  }

  open(): void {
    this.slidePanel.open(TestComponent, {
      data: {name: 'މަމްދޫހު'},
    }).afterDismissed().subscribe(res => {
      console.log(res);
    });
  }
  //
  // btopen(): void {
  //   this.bottomSheet.open(TestComponent, {data: null});
  // }
  //
  // dialogOpen(): void {
  //   this.dialog.open(TestComponent, {data: null});
  // }
}
