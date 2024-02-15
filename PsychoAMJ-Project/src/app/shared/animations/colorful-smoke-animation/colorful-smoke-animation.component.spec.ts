import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorfulSmokeAnimationComponent } from './colorful-smoke-animation.component';

describe('ColorfulSmokeAnimationComponent', () => {
  let component: ColorfulSmokeAnimationComponent;
  let fixture: ComponentFixture<ColorfulSmokeAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorfulSmokeAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorfulSmokeAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
