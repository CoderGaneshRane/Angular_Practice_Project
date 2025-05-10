import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMarkerComponent } from './image-marker.component';

describe('ImageMarkerComponent', () => {
  let component: ImageMarkerComponent;
  let fixture: ComponentFixture<ImageMarkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageMarkerComponent]
    });
    fixture = TestBed.createComponent(ImageMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
