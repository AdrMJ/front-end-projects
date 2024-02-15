import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { MethodsService } from '../../../../services/methods/methods.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let methodsServiceSpy: jasmine.SpyObj<MethodsService>;
    let elementDe: DebugElement;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MethodsService', ['showOrHideClouds']);

        TestBed.configureTestingModule({
            providers: [{
                provide: MethodsService, useValue: spy
            }],
            declarations: [FooterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        methodsServiceSpy = TestBed.inject(MethodsService) as jasmine.SpyObj<MethodsService>;
        elementDe = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(elementDe.query(By.css('.turnOnClouds'))).toBeTruthy();
        expect(elementDe.query(By.css('.text'))).toBeTruthy();
        expect(elementDe.query(By.css('img'))).toBeTruthy();
        expect(elementDe.query(By.css('.footer'))).toBeTruthy();
        expect(elementDe.query(By.css('.text'))).toBeTruthy();
    });

    it('should call showOrHideClouds() after showOrHide()', () => {
        component.showOrHide();
        expect(methodsServiceSpy.showOrHideClouds).toHaveBeenCalled();
    });

    it('should call showOrHide() after click div with class .turnOnClouds', () => {
        spyOn(component, "showOrHide");
        let turnOnClouds = fixture.debugElement.nativeElement.querySelector(".turnOnClouds");

        turnOnClouds.click();

        fixture.detectChanges();
        expect(component.showOrHide).toHaveBeenCalled();
    });

    it('should exist in div with turnOnClouds class and in div with footer class', () => {
        expect(document.querySelector('.turnOnClouds .text')).toBeTruthy(); 
        expect(document.querySelector('.footer .text')).toBeTruthy(); 
    });

    it('should img exist', () =>{
        const img = elementDe.nativeElement.querySelector('img');

        expect(img).toBeTruthy();

        const rectangleImg = img.getBoundingClientRect();
        
        setTimeout(() => {
            expect(rectangleImg.height).toBeGreaterThan(0);
            expect(rectangleImg.width).toBeGreaterThan(0);
        }, 10000);
        
    });
});
