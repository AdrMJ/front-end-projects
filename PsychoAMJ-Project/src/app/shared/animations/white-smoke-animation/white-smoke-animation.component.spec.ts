import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteSmokeAnimationComponent } from './white-smoke-animation.component';

describe('WhiteSmokeAnimationComponent', () => {
  let component: WhiteSmokeAnimationComponent;
  let fixture: ComponentFixture<WhiteSmokeAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhiteSmokeAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhiteSmokeAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
