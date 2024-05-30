import { TestBed } from '@angular/core/testing';

import { StoreCsvService } from './store-csv.service';

describe('StoreCsvService', () => {
  let service: StoreCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
