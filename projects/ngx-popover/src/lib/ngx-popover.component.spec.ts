import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPopoverComponent } from './ngx-popover.component';

describe('NgxPopoverComponent', () => {
  let component: NgxPopoverComponent;
  let fixture: ComponentFixture<NgxPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
