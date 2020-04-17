import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcontactsComponent } from './listcontacts.component';

describe('ListcontactsComponent', () => {
  let component: ListcontactsComponent;
  let fixture: ComponentFixture<ListcontactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcontactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
