import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemberPage } from './group-member.page';

describe('GroupMemberPage', () => {
  let component: GroupMemberPage;
  let fixture: ComponentFixture<GroupMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMemberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
