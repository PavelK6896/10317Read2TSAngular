import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTileComponent } from './post-tile.component';
import { Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PostResponseDto } from "../../../utill/interfaceUtill";
import { By } from "@angular/platform-browser";
import { logUtil } from "../../../utill/logUtill";


class RouterStub {
  navigate(path: string[]) {
    logUtil("path- ", path)
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 10);
    })
  }

  navigateByUrl(url: string) {
    logUtil("url- ", url)
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 10);
    })
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

describe('PostTileComponent 12', () => {
  let component: PostTileComponent;
  let fixture: ComponentFixture<PostTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostTileComponent],
      providers: [
        {provide: Router, useClass: RouterStub}
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTileComponent);
    component = fixture.componentInstance;

    component.post = p
    fixture.detectChanges();
  });

  it('1 create', () => {
    expect(component).toBeTruthy();
  });

  it('2 click loginButton', () => {
    let router = TestBed.inject(Router)
    let loginButton = fixture.debugElement.query(By.css('#post-btn'))
    let spyRouter = spyOn(router, 'navigateByUrl')
    loginButton.triggerEventHandler('click', null)
    expect(spyRouter).toHaveBeenCalledWith('/view-post/' + p.id)
  });
});
