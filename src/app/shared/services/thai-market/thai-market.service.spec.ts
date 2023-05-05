import { TestBed } from '@angular/core/testing';

import { ThaiMarketService } from './thai-market.service';

describe('ThaiMarketService', () => {
  let service: ThaiMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThaiMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
