import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogosComponent } from './logos.component';
import { MethodsService } from '../../../../services/methods/methods.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LogosComponent', () => {
    let component: LogosComponent;
    let fixture: ComponentFixture<LogosComponent>;
    let methodsServiceSpy: jasmine.SpyObj<MethodsService>;
    let elementDe: DebugElement;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MethodsService', ['showOrHide']);

        TestBed.configureTestingModule({
            providers: [{
                provide: MethodsService, useValue: spy
            }],
            declarations: [LogosComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(LogosComponent);
        component = fixture.componentInstance;
        methodsServiceSpy = TestBed.inject(MethodsService) as jasmine.SpyObj<MethodsService>;
        elementDe = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(elementDe.query(By.css('#content'))).toBeTruthy();
        expect(elementDe.query(By.css('#aj4_logo'))).toBeTruthy();
        expect(elementDe.query(By.css('#psychoamj_logo'))).toBeTruthy();

    });

    it('should call showOrHide() after showOrHideMenu()', () => {

        component.showOrHideMenu();
        expect(methodsServiceSpy.showOrHide).toHaveBeenCalled();
    });

    it('should call showOrHideMenu() after click psychoamj logo', () => {
        spyOn(component, "showOrHideMenu");

        let psychoamjLogo = elementDe.nativeElement.querySelector("#psychoamj_logo");
        psychoamjLogo.click();

        fixture.detectChanges();

        expect(component.showOrHideMenu).toHaveBeenCalled();
    });

    it('should call alert() after click aj4 logo', () => {
        spyOn(component, "alert");

        let aj4Logo = elementDe.nativeElement.querySelector("#aj4_logo");
        aj4Logo.click();

        fixture.detectChanges();

        expect(component.alert).toHaveBeenCalled();
    });

    it('should imgs exist', () =>{
        const imgPsychoamj = elementDe.nativeElement.querySelector('#psychoamj_logo');
        const imgAj4 = elementDe.nativeElement.querySelector('#aj4_logo');

        expect(imgPsychoamj).toBeTruthy();
        expect(imgAj4).toBeTruthy();

        const rectanglePsychoamj = imgPsychoamj.getBoundingClientRect();
        const rectangleAj4 = imgAj4.getBoundingClientRect();
        
        setTimeout(() => {
            expect(rectanglePsychoamj.height).toBeGreaterThan(0);
            expect(rectanglePsychoamj.width).toBeGreaterThan(0);

            expect(rectangleAj4.height).toBeGreaterThan(0);
            expect(rectangleAj4.width).toBeGreaterThan(0);
        }, 10000);
        
    });
});
