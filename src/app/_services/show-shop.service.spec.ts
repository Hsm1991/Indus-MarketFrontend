import { TestBed } from '@angular/core/testing';

import { ShowShopsService } from './show-shop.service';

describe('ShowShopService', () => {
  let service: ShowShopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowShopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
