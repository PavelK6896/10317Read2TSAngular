import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubredditComponent } from './create-subreddit.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";
import { SubredditService } from "../../../service/subreddit.service";
import { ToastrService } from "ngx-toastr";
import { logUtil } from "../../../utill/log1";

class RouterStub {
  navigateByUrl(url: string) {
    logUtil("url+ ", url)
  }
}

class ToastrServiceSub {
  success(message?: string) {
    logUtil("message+ ", message)
  }

  error(message?: string) {
    logUtil("message+ ", message)
  }
}

describe('CreateSubReadComponent 18', () => {
  let component: CreateSubredditComponent;
  let fixture: ComponentFixture<CreateSubredditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubredditComponent],
      providers: [SubredditService,
        {provide: Router, useClass: RouterStub},
        {provide: ToastrService, useClass: ToastrServiceSub},
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubredditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
  });
});
