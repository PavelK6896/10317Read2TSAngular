import { AuthService } from './auth.service';
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('AuthService 3', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('1 init', () => {
    expect(service).toBeTruthy();
  });

  it('2 login', () => {
    let data2 = {username: '1', authenticationToken: "s", refreshToken: "sss", expiresAt: "ss"}
    let httpClient = TestBed.inject(HttpClient);
    let spy = spyOn(httpClient, 'post');
    spy.and.returnValues(of(data2))

    let result = null
    service.loggedInEmitter.subscribe(v => result = v)
    let result2: string | null = null
    service.usernameEmitter.subscribe(v => result2 = v)

    service.login({
      username: "string",
      password: "string"
    }).subscribe(data => {
      expect(data).toBe(true)
    })
    expect(localStorage.getItem("username")).toBe(data2.username)
    expect(localStorage.getItem("authenticationToken")).toBe(data2.authenticationToken)
    expect(localStorage.getItem("refreshToken")).toBe(data2.refreshToken)
    expect(localStorage.getItem("expiresAt")).toBe(data2.expiresAt)
    expect(result).toBeTrue()
  });


  it('3 signUp', () => {
    let data1 = {
      username: "string",
      password: "string",
      email: "string"
    }
    let data2 = "User Registration Successful"
    let httpClient = TestBed.inject(HttpClient);
    let spy = spyOn(httpClient, 'post');
    spy.and.returnValues(of(data2))
    service.signUp(data1).subscribe(data => {
      expect(data).toBe(data2)
    })
    expect(spy).toHaveBeenCalled()
  })

  it('4 refreshToken', () => {
    let data24 = {username: '1', authenticationToken: "as", refreshToken: "ref", expiresAt: "ex"}
    let httpClient = TestBed.inject(HttpClient);
    let spy = spyOn(httpClient, 'post');
    spy.and.returnValues(of(data24))
    service.refreshToken()
    expect(spy).toHaveBeenCalled()
  });

  it('5 logout', () => {
    let data2 = "Refresh Token Deleted Successfully!"
    let httpClient = TestBed.inject(HttpClient);
    let spy = spyOn(httpClient, 'post');
    spy.and.returnValues(of(data2))
    service.logout()
    expect(spy).toHaveBeenCalled()
  });

});
