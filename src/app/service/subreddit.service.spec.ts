import { SubredditService } from './subreddit.service';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('SubReadService 20', () => {
  let service: SubredditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SubredditService);
  });

  it('1 should be created', () => {
    expect(service).toBeTruthy();
  });
});
