import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomechildComponent } from './homechild.component';

describe('HomechildComponent', () => {
  let component: HomechildComponent;
  let fixture: ComponentFixture<HomechildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomechildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomechildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
