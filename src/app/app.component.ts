import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { TestComponent } from './test/test.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounceTime, delay} from 'rxjs/operators';
import {AppService} from './app.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {MatSlidePanel} from 'ngx-mat-slide-panel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-workspace';
  form: FormGroup;
  banks = [];
  @ViewChild('input') input: ElementRef;

  constructor(
    private slidePanel: MatSlidePanel,
    private fb: FormBuilder,
    private service: AppService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      bank_id: null,
      filter: null,
      name: null
    });

    this.form.get('name').valueChanges.pipe(delay(300)).subscribe(value => {
      console.log({
        value,
      });
    });

    this.form.get('filter').valueChanges.pipe(debounceTime(200)).subscribe(search => {
      if (search) {
        this.service.getLocation(search).subscribe((resp: any) => {
          this.banks = resp.data.data;
          // this.cd.detectChanges();
        });
      }
    });
  }

  open(): void {
    // console.log(this.form.value);
    this.slidePanel.open(TestComponent);
  }

  btopen(): void {
    this.bottomSheet.open(TestComponent);
  }

  dialogOpen(): void {
    this.dialog.open(TestComponent);
  }
}
