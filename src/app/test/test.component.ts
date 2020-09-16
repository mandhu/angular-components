import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SLIDE_PANEL_DATA } from 'projects/mat-slide-panel/src/public-api';

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
