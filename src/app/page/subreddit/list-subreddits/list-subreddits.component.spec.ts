import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubredditsComponent } from './list-subreddits.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SubredditService } from "../../../service/subreddit.service";

describe('ListSubReadComponent 19', () => {
  let component: ListSubredditsComponent;
  let fixture: ComponentFixture<ListSubredditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSubredditsComponent],
      providers: [SubredditService,],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubredditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
  });
});
