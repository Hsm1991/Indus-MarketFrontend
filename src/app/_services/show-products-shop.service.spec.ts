import { TestBed } from '@angular/core/testing';

import { ShowProductsShopService } from './show-products-shop.service';

describe('ShowProductsShopService', () => {
  let service: ShowProductsShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowProductsShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
