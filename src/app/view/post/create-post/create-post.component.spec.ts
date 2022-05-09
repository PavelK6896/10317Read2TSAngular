import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from './create-post.component';
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PostService } from "../../../service/post.service";
import { SubReadService } from "../../../service/sub-read.service";
import { CreatePostPayload } from "../../../utill/classUtill";
import { logUtil } from "../../../utill/logUtill";

class RouterStub {
  navigate(path: string[]) {
    logUtil("path+ ", path)
  }

  navigateByUrl(url: string) {
    logUtil("url+ ", url)
  }
}

describe('CreatePostComponent 10', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostComponent],
      providers: [PostService, SubReadService,
        {provide: Router, useClass: RouterStub}],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(' 1 init ', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it(' 2 discardPost right button test', () => {
    let discardPost = fixture.debugElement.query(By.css('#discardPost'))
    let router = fixture.debugElement.injector.get(Router)
    let spyRouter = spyOn(router, 'navigateByUrl')
    discardPost.triggerEventHandler('click', null)
    expect(spyRouter).toHaveBeenCalledWith('')
  });

  it(' 3 createPost right', () => {
    let postPayload1: CreatePostPayload = {
      postName: "name",
      subReadName: "sub",
      url: "url",
      description: "d"
    }
    let router = TestBed.inject(Router)
    let postService = TestBed.inject(PostService)
    let createPost = fixture.debugElement.query(By.css('#createPost'))
    let spyPostService = spyOn(postService, 'createPost')
    spyPostService.and.returnValue(of(postPayload1))
    let spyRouter = spyOn(router, 'navigateByUrl')
    createPost.triggerEventHandler('click', null)
    expect(spyRouter).toHaveBeenCalledWith('')
    expect(spyPostService).toHaveBeenCalled();
    expect(spyPostService).toHaveBeenCalledWith(component.postPayload);
    expect(spyPostService.calls.count()).toBe(1)
  });
});
