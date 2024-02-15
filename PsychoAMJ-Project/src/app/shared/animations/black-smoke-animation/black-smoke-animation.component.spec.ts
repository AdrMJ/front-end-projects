import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackSmokeAnimationComponent } from './black-smoke-animation.component';

describe('BlackSmokeAnimationComponent', () => {
  let component: BlackSmokeAnimationComponent;
  let fixture: ComponentFixture<BlackSmokeAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlackSmokeAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlackSmokeAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
