import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { MethodsService } from '../../../../services/methods/methods.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
    let component: FooterComponent,
        fixture: ComponentFixture<FooterComponent>,
        methodsServiceSpy: jasmine.SpyObj<MethodsService>,
        elementDe: DebugElement;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MethodsService', ['showOrHideClouds']);

        TestBed.configureTestingModule({
            providers: [{
                provide: MethodsService, useValue: spy
            }],
            declarations: [FooterComponent]
        }).compileComponents();

        methodsServiceSpy = TestBed.inject(MethodsService) as jasmine.SpyObj<MethodsService>;
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        elementDe = fixture.debugElement;
    })

    it('should create', () => {
        expect(component).withContext('should create component').toBeTruthy();

        expect(elementDe.query(By.css('.turnOnClouds'))).withContext('should create div with class turnOnClouds').toBeTruthy();
        expect(elementDe.query(By.css('.text'))).withContext('should create div with class .text').toBeTruthy();
        expect(elementDe.query(By.css('img'))).withContext('should create img').toBeTruthy();
        expect(elementDe.query(By.css('.footer'))).withContext('should create div with class footer').toBeTruthy();
        expect(elementDe.query(By.css('.text'))).withContext('should create div with class text').toBeTruthy();

        expect(document.querySelector('.turnOnClouds .text')).withContext('should exist in div with class turnOnClouds').toBeTruthy();
        expect(document.querySelector('.footer .text')).withContext('should exist in div with class footer').toBeTruthy();
    })

    describe('#showOrHideClouds', () => {

        it('should call showOrHideClouds() after showOrHide()', () => {
            component.showOrHide();
            expect(methodsServiceSpy.showOrHideClouds).withContext('should have been called').toHaveBeenCalled();
        })

    })

    describe('#showOrHide', () => {

        it('should call showOrHide() after click div with class .turnOnClouds', () => {
            spyOn(component, "showOrHide");
            let turnOnClouds = fixture.debugElement.nativeElement.querySelector(".turnOnClouds");

            turnOnClouds.click();

            fixture.detectChanges();
            expect(component.showOrHide).withContext('should have been called').toHaveBeenCalled();
        })

    })

    describe('<img/>', () => {

        it('should img render', () => {
            const img = elementDe.nativeElement.querySelector('img');

            expect(img).withContext('should be truthy').toBeTruthy();

            const rectangleImg = img.getBoundingClientRect();

            setTimeout(() => {
                expect(rectangleImg.height).withContext('should be greater than 0').toBeGreaterThan(0);
                expect(rectangleImg.width).withContext('should be greater than 0').toBeGreaterThan(0);
            }, 10000);

        })

    })

})
