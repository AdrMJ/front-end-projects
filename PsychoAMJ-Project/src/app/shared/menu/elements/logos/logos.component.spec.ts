import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogosComponent } from './logos.component';
import { MethodsService } from '../../../../services/methods/methods.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LogosComponent', () => {
    let methodsServiceSpy: jasmine.SpyObj<MethodsService>,
        fixture: ComponentFixture<LogosComponent>,
        component: LogosComponent,
        elementDe: DebugElement;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MethodsService', ['showOrHide']);

        TestBed.configureTestingModule({
            providers: [{
                provide: MethodsService, useValue: spy
            }],
            declarations: [LogosComponent]
        }).compileComponents();

        methodsServiceSpy = TestBed.inject(MethodsService) as jasmine.SpyObj<MethodsService>;
        fixture = TestBed.createComponent(LogosComponent);
        component = fixture.componentInstance;
        elementDe = fixture.debugElement;
    })

    it('should create', () => {
        expect(component).withContext('should create component').toBeTruthy();

        expect(elementDe.query(By.css('#content'))).withContext('should create div with id content').toBeTruthy();
        expect(elementDe.query(By.css('#aj4_logo'))).withContext('should create img with id aj4_logo').toBeTruthy();
        expect(elementDe.query(By.css('#psychoamj_logo'))).withContext('should create img with id psychoamj_logo').toBeTruthy();

    })

    describe('#showOrHide', () => {

        it('should call showOrHide() after showOrHideMenu()', () => {
            component.showOrHideMenu();

            expect(methodsServiceSpy.showOrHide).withContext('showOrHide method from methodsService should have been called').toHaveBeenCalled();
        })

    })

    describe('#showOrHideMenu', () => {

        it('should have been called after click psychoamj logo', () => {
            let psychoamjLogo = elementDe.nativeElement.querySelector("#psychoamj_logo");
            spyOn(component, "showOrHideMenu");

            psychoamjLogo.click();
            fixture.detectChanges();

            expect(component.showOrHideMenu).withContext('showOrHideMenu method should have been called').toHaveBeenCalled();
        })

    })

    describe('#alert', () => {

        it('should have been called after click aj4 logo', () => {
            let aj4Logo = elementDe.nativeElement.querySelector("#aj4_logo");
            spyOn(component, "alert");

            aj4Logo.click();
            fixture.detectChanges();

            expect(component.alert).withContext('alert should have been called').toHaveBeenCalled();
        })

    })

    describe('<img/>', () => {

        it('should imgs exist', () => {
            const imgPsychoamj = elementDe.nativeElement.querySelector('#psychoamj_logo'),
                imgAj4 = elementDe.nativeElement.querySelector('#aj4_logo');

            expect(imgPsychoamj).toBeTruthy();
            expect(imgAj4).toBeTruthy();

            const rectanglePsychoamj = imgPsychoamj.getBoundingClientRect(),
                rectangleAj4 = imgAj4.getBoundingClientRect();

            setTimeout(() => {
                expect(rectanglePsychoamj.height).withContext('rectanglePsychoamj s height should have more than 0 height').toBeGreaterThan(0);
                expect(rectanglePsychoamj.width).withContext('rectanglePsychoamj s height should have more than 0 width').toBeGreaterThan(0);

                expect(rectangleAj4.height).withContext('rectangleAj4 s height should have more than 0 height').toBeGreaterThan(0);
                expect(rectangleAj4.width).withContext('rectangleAj4 s height should have more than 0 width').toBeGreaterThan(0);
            }, 10000);

        })

    })
})
