import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SLIDE_PANEL_DATA} from 'projects/mat-slide-panel/src/public-api';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
// import {MAT_SLIDE_PANEL_DATA} from 'mat-slide-panel';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  form: UntypedFormGroup;
  banks = [
    {
      id: 1, name: 'BML'
    }
  ];

  constructor(
    private fb: UntypedFormBuilder,
    @Inject(MAT_SLIDE_PANEL_DATA) public data,
  ) {
    this.form = this.fb.group({
      name: null
    });
    this.form.patchValue(this.data);
  }

  ngOnInit(): void {
  }

}
