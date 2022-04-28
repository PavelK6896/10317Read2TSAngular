import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from "@angular/router";
import { of, Subject } from "rxjs";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CommentService } from "../../../service/comment.service";
import { PostService } from "../../../service/post.service";
import { PostResponseDto } from "../../../utill/interface1";

class ActivatedRouteStub {
  snapshot: ActivatedRouteSnapshot;
  private subject = new Subject<Params>();

  constructor() {
    this.snapshot = new ActivatedRouteSnapshot()
    this.snapshot.params = of({name: 'user13'})
  }

  get queryParams() {
    return this.subject.asObservable()
  }

  push(params: Params) {
    this.subject.next(params)
  }
}

describe('UserProfileComponent 5', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [CommentService, PostService,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 init', () => {
    expect(component).toBeDefined();
  });

  it('2', () => {
    let commentService = TestBed.inject(CommentService)
    let postService = TestBed.inject(PostService)
    let spyPostService = spyOn(postService, 'getAllPostsByUser').and.returnValue(of([]))
    let spyCommentService = spyOn(commentService, 'getAllCommentsByUser').and.returnValue(of([]))
    component.ngOnInit()
    expect(spyPostService).toHaveBeenCalled()
    expect(spyCommentService).toHaveBeenCalled()

    let p: PostResponseDto = {
      id: 1,
      postName: "string",
      description: "string",
      userName: "string",
      subReadName: "string",
      subReadId: 56,
      voteCount: 45,
      commentCount: 12,
      duration: "string",
      vote: "UP_VOTE",
    }
    component.posts = [p]
    component.loadingPost = true
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('app-post-tile')).not.toBe(null);
  });
});
