import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { of, Subject } from "rxjs";
import { By } from "@angular/platform-browser";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../../../service/auth.service";
import { logUtil } from "../../../utill/logUtill";

class RouterStub {
  navigateByUrl(url: string) {
    logUtil("url+ ", url)
  }

  catch!: () => {}
}

class ActivatedRouteStub {
  private subject = new Subject<Params>();

  get queryParams() {
    return this.subject.asObservable()
  }

  push(params: Params) {
    this.subject.next(params)
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

describe('LoginComponent 2', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: ToastrService, useClass: ToastrServiceSub},
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 init', () => {
    expect(component).toBeTruthy();
  });

  it('3 login', () => {
    component.loginForm = new FormGroup({
      username: new FormControl('dd', Validators.required),
      password: new FormControl('dd', Validators.required)
    });
    fixture.detectChanges();
    let auth = TestBed.inject(AuthService)
    let spyAuth = spyOn(auth, 'login').and.returnValue(of(true))
    let loginButton = fixture.debugElement.query(By.css('#login-btn'))
    let router = fixture.debugElement.injector.get(Router)
    let spyRouter = spyOn(router, 'navigateByUrl')

    fixture.detectChanges();
    loginButton.triggerEventHandler('click', null)
    expect(spyAuth).toHaveBeenCalledWith({username: 'dd', password: 'dd'})
    expect(spyRouter).toHaveBeenCalledWith('')
  });

});

