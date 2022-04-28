import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditSideBarComponent } from './subreddit-side-bar.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { SubredditService } from "../../service/subreddit.service";
import { SubredditModel } from "../../utill/class1";

describe('SubReadSideBarComponent 14', () => {
  let component: SubredditSideBarComponent;
  let fixture: ComponentFixture<SubredditSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubredditSideBarComponent],
      providers: [SubredditService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
    let subredditService = TestBed.inject(SubredditService)
    let spyService = spyOn(subredditService, 'getAllSubreddits')
    spyService.and.returnValues(of(
      [
        new SubredditModel(1, 'n1', 'd1', 1),
        new SubredditModel(2, 'n1', 'd1', 2),
        new SubredditModel(3, 'n1', 'd1', 3),
        new SubredditModel(4, 'n1', 'd1', 4),
      ]))
    component.ngOnInit()
    expect(component.displayViewAll).toBe(true)
  });
});
