import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PostService } from "../../service/post.service";
import { PostResponseDto } from "../../utill/interfaceUtill";

describe('HomeComponent 9', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [PostService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

  });

  it(' 1 init ', () => {
    expect(component).toBeTruthy();
  });

  it(' 2 getAllPosts ', () => {

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
    spyOn(postService, 'getPagePosts').and.returnValue(of())

    component.loadingPost = true
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.posts).toEqual(postsTest)

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-post-tile')).not.toEqual(null);
    expect(compiled.querySelector('app-side-bar')).not.toEqual(null);
    expect(compiled.querySelector('app-subreddit-side-bar')).not.toEqual(null);
  });

});
