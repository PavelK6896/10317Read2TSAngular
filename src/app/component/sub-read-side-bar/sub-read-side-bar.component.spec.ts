import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubReadSideBarComponent } from './sub-read-side-bar.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { SubReadService } from "../../service/sub-read.service";
import { PageSubReadDto } from "../../utill/interfaceUtill";

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
    let spyService = spyOn(subredditService, 'getPageSubRead')
    let page: PageSubReadDto = {
      empty: false,
      first: false, last: false, number: 0, numberOfElements: 0, size: 0, totalElements: 0, totalPages: 0,
      content: []
    }
    let pageSubReadDtoObservable = of(page);
    spyService.and.returnValues(pageSubReadDtoObservable)
    component.ngOnInit()
    expect(component.displayViewAll).toBe(true)
  });
});
