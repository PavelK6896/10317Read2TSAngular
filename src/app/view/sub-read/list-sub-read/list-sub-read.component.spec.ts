import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubReadComponent } from './list-sub-read.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SubReadService } from "../../../service/sub-read.service";

describe('ListSubReadComponent 19', () => {
  let component: ListSubReadComponent;
  let fixture: ComponentFixture<ListSubReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSubReadComponent],
      providers: [SubReadService,],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 should create', () => {
    expect(component).toBeTruthy();
  });
});
