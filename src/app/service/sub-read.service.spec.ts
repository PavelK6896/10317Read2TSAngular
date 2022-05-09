import { SubReadService } from './sub-read.service';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('SubReadService 20', () => {
  let service: SubReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SubReadService);
  });

  it('1 should be created', () => {
    expect(service).toBeTruthy();
  });
});
