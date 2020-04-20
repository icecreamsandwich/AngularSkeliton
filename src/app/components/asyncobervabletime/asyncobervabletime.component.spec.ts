import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncobervabletimeComponent } from './asyncobervabletime.component';

describe('AsyncobervabletimeComponent', () => {
  let component: AsyncobervabletimeComponent;
  let fixture: ComponentFixture<AsyncobervabletimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncobervabletimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncobervabletimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
