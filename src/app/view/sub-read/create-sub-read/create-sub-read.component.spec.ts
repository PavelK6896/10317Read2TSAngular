import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubReadComponent } from './create-sub-read.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";
import { SubReadService } from "../../../service/sub-read.service";
import { ToastrService } from "ngx-toastr";
import { logUtil } from "../../../utill/logUtill";

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
  let component: CreateSubReadComponent;
  let fixture: ComponentFixture<CreateSubReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubReadComponent],
      providers: [SubReadService,
        {provide: Router, useClass: RouterStub},
        {provide: ToastrService, useClass: ToastrServiceSub},
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
  });
});
