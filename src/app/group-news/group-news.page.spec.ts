import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNewsPage } from './group-news.page';

describe('GroupNewsPage', () => {
  let component: GroupNewsPage;
  let fixture: ComponentFixture<GroupNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
