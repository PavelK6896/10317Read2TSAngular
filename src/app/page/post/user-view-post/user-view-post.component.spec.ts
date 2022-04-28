import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewPostComponent } from './user-view-post.component';
import { PostService } from "../../../service/post.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { PostResponseDto } from "../../../utill/interface1";

class ActivatedRouteStub {
  snapshot: ActivatedRouteSnapshot;

  constructor() {
    this.snapshot = new ActivatedRouteSnapshot()
    this.snapshot.params = of({id: 123})
  }
}


describe('UserViewPostComponent 101', () => {
  let component: UserViewPostComponent;
  let fixture: ComponentFixture<UserViewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewPostComponent],
      providers: [PostService,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
  });

  it('2', () => {

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

    const postsTest = [p];
    let postService = TestBed.inject(PostService)
    spyOn(postService, 'getAllPostsByUser').and.returnValue(of(postsTest))


    component.ngOnInit()
    expect(component.posts).toEqual(postsTest)

    component.loadingPost = true
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-post-tile')).not.toBe(null);
  });
});
