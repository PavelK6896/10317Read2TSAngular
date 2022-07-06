import { CommentService } from './comment.service';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { CommentPayload } from "../utill/classUtill";

describe('CommentService 7', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommentService);
  });

  it('1 create', () => {
    expect(service).toBeTruthy();
    let postComment = spyOn(service, 'createComment').and.returnValue(of([]))
    service.createComment(new CommentPayload())
    expect(postComment).toHaveBeenCalled()

  });

  it('2 get for post', () => {
    let getAllCommentsForPost = spyOn(service, 'getSliceCommentsForPost').and.returnValue(of())
    service.getSliceCommentsForPost(1)
    expect(getAllCommentsForPost).toHaveBeenCalled()
  });

  it('3 get by user', () => {
    let getAllCommentsByUser = spyOn(service, 'getSliceCommentsByUser').and.returnValue(of())
    service.getSliceCommentsByUser("")
    expect(getAllCommentsByUser).toHaveBeenCalled()
  });
});
