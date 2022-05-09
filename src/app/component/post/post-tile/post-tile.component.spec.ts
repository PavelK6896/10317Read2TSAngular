import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTileComponent } from './post-tile.component';
import { Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PostResponseDto } from "../../../utill/interface1";
import { By } from "@angular/platform-browser";
import { logUtil } from "../../../utill/log1";


class RouterStub {
  navigate(path: string[]) {
    logUtil("path- ", path)
  }

  navigateByUrl(url: string) {
    logUtil("url- ", url)
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

  it('1 ', () => {
    expect(component).toBeTruthy();
  });

  it('2 click loginButton', () => {
    let router = TestBed.inject(Router)
    let loginButton = fixture.debugElement.query(By.css('.loginButton'))
    let spyRouter = spyOn(router, 'navigateByUrl')
    loginButton.triggerEventHandler('click', null)
    expect(spyRouter).toHaveBeenCalledWith('/view-post/' + p.id)
  });
});
