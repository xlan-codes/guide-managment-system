import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideRankingPortalComponent } from './guide-ranking-portal.component';

describe('GuideRankingPortalComponent', () => {
  let component: GuideRankingPortalComponent;
  let fixture: ComponentFixture<GuideRankingPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideRankingPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideRankingPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
