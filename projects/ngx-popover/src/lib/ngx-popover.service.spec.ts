import { TestBed } from '@angular/core/testing';

import { NgxPopoverService } from './ngx-popover.service';

describe('NgxPopoverService', () => {
  let service: NgxPopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
