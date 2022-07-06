import { TestBed } from '@angular/core/testing';

import { PropertyService } from './property.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PropertyService);
  });

  it('1 property service', () => {
    expect(service).toBeTruthy();
  });
});
