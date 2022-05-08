import { AuthGuard } from './auth.guard';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

class RouterStub {
  navigateByUrl(url: string) {
  }
}

describe('AuthGuard 6', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [AuthService,
        {provide: Router, useClass: RouterStub}
      ],
      imports: [HttpClientTestingModule],
    })
    guard = TestBed.inject(AuthGuard);
  })

  it('1 init', () => {
    expect(guard).toBeTruthy();
  })

  it('2 canActivate', () => {

    let router = TestBed.inject(Router)
    let authService = TestBed.inject(AuthService)
    let spyPostService = spyOn(authService, 'isLoggedIn').and.returnValue(false)
    let spyRouter = spyOn(router, 'navigateByUrl')
    let canAct = guard.canActivate()
    expect(spyPostService).toHaveBeenCalled()
    expect(spyRouter).toHaveBeenCalled()
    expect(canAct).toBe(true)

  })
})
