import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../../service/auth.service";
import { logUtil } from "../../utill/log1";


class RouterStub {
  navigate(path: string[]) {
    logUtil("path- ", path)
  }

  navigateByUrl(url: string) {
    logUtil("url- ", url)
  }
}

describe('HeaderComponent 8', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [AuthService,
        {provide: Router, useClass: RouterStub}
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it(' 1 init', () => {
    expect(component).toBeTruthy();
  });

  it(' 2 checking for name changes', () => {

    component.isLoggedIn = true
    component.username = 'user1'
    fixture.detectChanges()
    let debugElement = fixture.debugElement.query(By.css('#dropdownBasic1'));
    expect(debugElement.nativeElement.textContent).toContain('user1')
  });

  it(' 3 goToUserProfile right', () => {

    let userName = 'user1'
    component.isLoggedIn = true
    component.username = userName
    fixture.detectChanges()
    let goToUserProfile = fixture.debugElement.query(By.css('#goToUserProfile'))
    let router = fixture.debugElement.injector.get(Router)
    let spy = spyOn(router, 'navigateByUrl')
    goToUserProfile.triggerEventHandler('click', null)
    expect(spy).toHaveBeenCalledWith('/user-profile/' + userName)

  });

  it(' 4 logout', () => {

    let userName = 'user1'
    component.isLoggedIn = true
    component.username = userName
    fixture.detectChanges()
    let logout = fixture.debugElement.query(By.css('#logout'))
    let router = fixture.debugElement.injector.get(Router)
    let spy = spyOn(router, 'navigateByUrl')
    let authService = fixture.debugElement.injector.get(AuthService)
    let authServiceSpy = spyOn(authService, 'logout')
    logout.triggerEventHandler('click', null)
    expect(spy).toHaveBeenCalledWith('')
    expect(component.isLoggedIn).toBeFalse()
    expect(authServiceSpy).toHaveBeenCalled();
    expect(authServiceSpy).toHaveBeenCalledWith();
    expect(authServiceSpy.calls.count()).toBe(1)
  });
});
