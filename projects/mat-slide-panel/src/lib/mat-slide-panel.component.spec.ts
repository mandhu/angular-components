import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSlidePanel } from './mat-slide-panel';

describe('MatSlidePanel', () => {
  let component: MatSlidePanel;
  let fixture: ComponentFixture<MatSlidePanel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatSlidePanel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSlidePanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
