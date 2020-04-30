import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordrequestComponent } from './resetpasswordrequest.component';

describe('ResetpasswordrequestComponent', () => {
  let component: ResetpasswordrequestComponent;
  let fixture: ComponentFixture<ResetpasswordrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
