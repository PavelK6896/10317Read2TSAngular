import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostComponent } from './view-post.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PostService } from "../../../service/post.service";
import { CommentService } from "../../../service/comment.service";
import { PostResponseDto } from "../../../utill/interfaceUtill";

class RouterStub {
  navigateByUrl(url: string) {
  }
}

class ActivatedRouteStub {
  snapshot: ActivatedRouteSnapshot;

  constructor() {
    this.snapshot = new ActivatedRouteSnapshot()
    this.snapshot.params = of({id: 123})
  }
}

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


describe('ViewPostComponent 11', () => {
  let component: ViewPostComponent;
  let fixture: ComponentFixture<ViewPostComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPostComponent],
      providers: [PostService, CommentService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostComponent);
    component = fixture.componentInstance;
    component.post = p

    fixture.detectChanges();
  });


  it('1 init ', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });
  it('2 content ', () => {
    component.loadingPost = true
    component.loadingComment = true
    fixture.detectChanges();

    let username = fixture.debugElement.query(By.css('.post-text')).nativeElement.innerText
    expect(username).toBe('Title: ' + p.userName)
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-vote-button')).not.toBe(null);
    expect(compiled.querySelector('app-side-bar')).not.toBe(null);
    expect(compiled.querySelector('app-subreddit-side-bar')).not.toBe(null);
  });
});
