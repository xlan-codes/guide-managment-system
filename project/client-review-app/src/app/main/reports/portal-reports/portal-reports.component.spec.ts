import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalReportsComponent } from './portal-reports.component';

describe('PortalReportsComponent', () => {
  let component: PortalReportsComponent;
  let fixture: ComponentFixture<PortalReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
