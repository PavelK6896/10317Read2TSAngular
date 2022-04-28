import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarComponent } from './side-bar.component';
import { Router } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";

class RouterStub {
  navigateByUrl(url: string) {
  }
}

describe('SideBarComponent 13', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideBarComponent],
      providers: [
        {provide: Router, useClass: RouterStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 fun', () => {
    expect(component).toBeTruthy();
    let router = TestBed.inject(Router);
    let spyRouter1 = spyOn(router, 'navigateByUrl')
    component.goToCreatePost()
    expect(spyRouter1).toHaveBeenCalledWith('/create-post')
    component.goToCreateSubRead()
    expect(spyRouter1).toHaveBeenCalledWith('/create-subreddit')
  });
});
