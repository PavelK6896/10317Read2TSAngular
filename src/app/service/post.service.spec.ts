import { PostService } from './post.service';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('PostService 16', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
  });

  it('1 should be created', () => {
    expect(service).toBeTruthy();
  });
});
