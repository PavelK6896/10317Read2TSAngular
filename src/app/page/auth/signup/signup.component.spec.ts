import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClient } from "@angular/common/http";
import { NavigationExtras, Router } from "@angular/router";
// import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../../../service/auth.service";

class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) {
  }
}

class ToastrServiceSub {
  success(message?: string) {
  }

  error(message?: string) {
  }
}

describe('SignupComponent 4', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [AuthService,
        {provide: Router, useClass: RouterStub},
        {provide: ToastrService, useClass: ToastrServiceSub},
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 init ', () => {
    expect(component).toBeTruthy();
  });

  it('2 signUp', () => {

    component.signUpForm = new FormGroup({
      username: new FormControl('us1', Validators.required),
      email: new FormControl('em1', [Validators.required, Validators.email]),
      password: new FormControl('pa1', Validators.required),
    });
    fixture.detectChanges();

    let data2 = {}

    let httpClient = TestBed.inject(HttpClient);
    let spy = spyOn(httpClient, 'post');
    spy.and.returnValues(of(data2))

    let authService = TestBed.inject(AuthService)
    let router = TestBed.inject(Router)
    let toastrService = TestBed.inject(ToastrService)
    let spyAuth = spyOn(authService, 'signUp').and.returnValue(of(true))
    // let spyToastrService = spyOn(toastrService, 'success')
    let spyRouter = spyOn(router, 'navigate')

    let debugElement = fixture.debugElement.query(By.css('.sign-up'));
    fixture.detectChanges();
    debugElement.triggerEventHandler('click', null)

    // expect(spyToastrService).toHaveBeenCalled()
    expect(spyAuth).toHaveBeenCalled()
    expect(spyRouter).toHaveBeenCalled()
  });
});
