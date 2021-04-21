import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_SLIDE_PANEL_DATA, MatSlidePanel} from 'projects/mat-slide-panel/src/public-api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {debounceTime} from 'rxjs/operators';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  form: FormGroup;
  banks = [];

  constructor(
    private fb: FormBuilder,
    // @Inject(MAT_DIALOG_DATA) public data,
    // @Inject(MAT_SLIDE_PANEL_DATA) public data,
    private service: AppService,
    private cd: ChangeDetectorRef,
    // @Inject(MAT_BOTTOM_SHEET_DATA) public dtData: {names: string[]}
  ) {
    this.form = this.fb.group({
      bank_id: null,
      filter: null
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

  ngOnInit(): void {
  }

}
