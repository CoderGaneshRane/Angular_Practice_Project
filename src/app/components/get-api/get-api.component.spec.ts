import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApiComponent } from './get-api.component';

describe('GetApiComponent', () => {
  let component: GetApiComponent;
  let fixture: ComponentFixture<GetApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetApiComponent]
    });
    fixture = TestBed.createComponent(GetApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
