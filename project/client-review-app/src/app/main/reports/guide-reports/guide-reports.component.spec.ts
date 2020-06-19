import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideReportsComponent } from './guide-reports.component';

describe('GuideReportsComponent', () => {
  let component: GuideReportsComponent;
  let fixture: ComponentFixture<GuideReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
