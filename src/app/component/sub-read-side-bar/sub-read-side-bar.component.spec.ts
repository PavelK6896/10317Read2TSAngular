import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubReadSideBarComponent } from './sub-read-side-bar.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { SubReadService } from "../../service/sub-read.service";
import { SubReadModel } from "../../utill/classUtill";

describe('SubReadSideBarComponent 14', () => {
  let component: SubReadSideBarComponent;
  let fixture: ComponentFixture<SubReadSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubReadSideBarComponent],
      providers: [SubReadService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubReadSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
    let subredditService = TestBed.inject(SubReadService)
    let spyService = spyOn(subredditService, 'getAllSubreddits')
    spyService.and.returnValues(of(
      [
        new SubReadModel(1, 'n1', 'd1', 1),
        new SubReadModel(2, 'n1', 'd1', 2),
        new SubReadModel(3, 'n1', 'd1', 3),
        new SubReadModel(4, 'n1', 'd1', 4),
      ]))
    component.ngOnInit()
    expect(component.displayViewAll).toBe(true)
  });
});
