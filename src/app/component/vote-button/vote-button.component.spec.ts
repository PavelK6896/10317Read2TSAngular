import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteButtonComponent } from './vote-button.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { VoteService } from "../../service/vote.service";
import { AuthService } from "../../service/auth.service";
import { PostResponseDto } from "../../utill/interfaceUtill";
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";


class RouterStub {
  navigate(path: string[]) {
  }

  navigateByUrl(url: string) {
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

describe('VoteButtonComponent 15', () => {
  let component: VoteButtonComponent;
  let fixture: ComponentFixture<VoteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoteButtonComponent],
      providers: [VoteService, AuthService,
        {provide: Router, useClass: RouterStub}
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteButtonComponent);
    component = fixture.componentInstance;
    component.post = p
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
  });

  it('2 auth false', () => {

    let authService = TestBed.inject(AuthService)
    let router = TestBed.inject(Router)
    spyOn(authService, 'isLoggedIn').and.returnValues(false)
    let spy = spyOn(router, 'navigateByUrl')
    component.upVotePost()
    expect(spy).toHaveBeenCalledWith('login')
    let debugElement = fixture.debugElement.query(By.css('#vote-count'));
    expect(debugElement.nativeElement.textContent).toContain(p.voteCount)
    let debugElement2 = fixture.debugElement.query(By.css('#down-vote'));
    debugElement2.triggerEventHandler('click', null)
    expect(spy).toHaveBeenCalledWith('login')
  });

  it('3 auth true', () => {

    let authService = TestBed.inject(AuthService)
    let voteService = TestBed.inject(VoteService)
    TestBed.inject(Router)
    spyOn(authService, 'isLoggedIn').and.returnValues(true)
    let spyService2 = spyOn(voteService, 'vote').and.returnValues(of(1050))
    component.upVotePost()
    expect(spyService2).toHaveBeenCalled()
    expect(component.post.voteCount).toBe(1050)
  });
});
