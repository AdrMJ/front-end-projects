import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelComponent } from './left-panel.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LeftPanelComponent', () => {
    let component: LeftPanelComponent;
    let fixture: ComponentFixture<LeftPanelComponent>;
    let elementDe: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LeftPanelComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LeftPanelComponent);
        component = fixture.componentInstance;
        elementDe = fixture.debugElement;
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(elementDe.query(By.css('.panel'))).withContext('should create div with class panel').toBeTruthy();
        expect(elementDe.query(By.css('.content'))).withContext('should create div with class content').toBeTruthy();
        expect(elementDe.queryAll(By.css('.nav'))).withContext('should create div with class nav').toBeTruthy();

        expect(elementDe.queryAll(By.css('.nav')).length).withContext('should be 4 div with class nav').toEqual(4);
    });

    it('should change details category by click with correct value', () => {
        spyOn(component, 'changeDetailsCategory');
        const allNav = elementDe.queryAll(By.css(".nav"));

        for (let i = 0; i < 4; i++) {
            allNav[i].nativeElement.click();
            fixture.detectChanges();

            expect(component.changeDetailsCategory).withContext("should call change details category").toHaveBeenCalledWith(allNav[i].nativeElement.id);
        }
    });

    it('@Output should have been called with test after use changeDetailsCategory', () => {
        spyOn(component.detailsCategory, 'emit');
        component.changeDetailsCategory('test');

        expect(component.detailsCategory.emit).withContext("should have been called with test").toHaveBeenCalledWith("test");
    });
});
