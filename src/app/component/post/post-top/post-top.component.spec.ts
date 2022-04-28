import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTopComponent } from './post-top.component';
import { PostResponseDto } from "../../../utill/interface1";

describe('PostTopComponent 22', () => {
  let component: PostTopComponent;
  let fixture: ComponentFixture<PostTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostTopComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTopComponent);
    component = fixture.componentInstance;
    let p: PostResponseDto = {
      id: 1,
      postName: "string",
      description: "string",
      userName: "string",
      subReadName: "string",
      subReadId: 56,
      voteCount: 45,
      commentCount: 12,
      duration: new Date().toString(),
      vote: "UP_VOTE",
    }
    component.post = p
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
  });
});
