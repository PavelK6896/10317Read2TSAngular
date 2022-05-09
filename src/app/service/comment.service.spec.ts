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

  it('1 ', () => {
    expect(service).toBeTruthy();
    let postComment = spyOn(service, 'postComment').and.returnValue(of([]))
    service.postComment(new CommentPayload())
    expect(postComment).toHaveBeenCalled()

  });

  it('2 ', () => {
    let getAllCommentsForPost = spyOn(service, 'getAllCommentsForPost').and.returnValue(of([]))
    service.getAllCommentsForPost(1)
    expect(getAllCommentsForPost).toHaveBeenCalled()
  });

  it('3 ', () => {
    let getAllCommentsByUser = spyOn(service, 'getAllCommentsByUser').and.returnValue(of([]))
    service.getAllCommentsByUser("")
    expect(getAllCommentsByUser).toHaveBeenCalled()
  });
});
