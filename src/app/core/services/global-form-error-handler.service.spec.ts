import { TestBed } from '@angular/core/testing';

import { GlobalFormErrorHandlerService } from './global-form-error-handler.service';

describe('GlobalFormErrorHandlerService', () => {
  let service: GlobalFormErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalFormErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
