import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudsAndStarsComponent } from './clouds-and-stars.component';

describe('CloudsAndStarsComponent', () => {
  let component: CloudsAndStarsComponent;
  let fixture: ComponentFixture<CloudsAndStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloudsAndStarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloudsAndStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
