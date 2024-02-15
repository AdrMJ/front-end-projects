import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { MethodsService } from '../../../../services/methods/methods.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BookListComponent } from '../../../../main-pages/book-list/book-list.component';
import { Location } from '@angular/common';

describe('NavComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    let methodsServiceSpy: jasmine.SpyObj<MethodsService>;

    let elementDe: DebugElement;
    let router: Router;
    let location: Location;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MethodsService', ['showOrHide']);
        const routes = [
            {
                path: 'all', component: BookListComponent
            },
        ];
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            providers: [
                {
                    provide: MethodsService, useValue: spy
                },
            ],
            declarations: [NavComponent]
        }).compileComponents();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;

        methodsServiceSpy = TestBed.inject(MethodsService) as jasmine.SpyObj<MethodsService>;
        elementDe = fixture.debugElement;
    });

    it("fakeAsync works", fakeAsync(() => {
        let promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => (done = true));
        tick(50);
        expect(done).toBeTruthy();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(elementDe.query(By.css('.nav'))).toBeTruthy();
        expect(elementDe.query(By.css('ul'))).toBeTruthy();
        expect(elementDe.queryAll(By.css('li')).length).toEqual(elementDe.queryAll(By.css('a')).length);
    });

    it('should @Output emit after use changeNav', () => {
        spyOn(component.nav, 'emit');
        component.changeNav('categories');
        fixture.detectChanges();

        expect(component.nav.emit).toHaveBeenCalledWith('categories');
    });

    it('should @Output emit after click #categories', () => {
        spyOn(component.nav, 'emit');
        const aCategories = elementDe.nativeElement.querySelector('#categories');
        aCategories.click();
        fixture.detectChanges();

        expect(component.nav.emit).toHaveBeenCalledWith('categories');
    });

    it('router should navigate to /all', fakeAsync(() => {
        router.navigate(['all']);
        tick();
        expect(location.path()).toBe('/all');
    }));

    it('routerLink should navigate to /all', fakeAsync(() => {

        let aAll = elementDe.nativeElement.querySelector('#all');
        aAll.click();

        tick();

        expect(location.path()).toBe('/all');
    }));

    it('should call changeNav() after click text category', () => {
        spyOn(component, "changeNav");

        let textCategories = fixture.nativeElement.querySelector('#categories');
        textCategories.click();
        fixture.detectChanges();

        expect(component.changeNav).toHaveBeenCalled();
    });

    it('should call changeNav() after click text titles', () => {
        spyOn(component, "changeNav");

        let textTitles = elementDe.nativeElement.querySelector('#titles');
        textTitles.click();
        fixture.detectChanges();

        expect(component.changeNav).toHaveBeenCalled();
    });

    it('should call changeNav() after click text themes', () => {
        spyOn(component, "changeNav");

        let textThemes = elementDe.nativeElement.querySelector('#themes');
        textThemes.click();
        fixture.detectChanges();

        expect(component.changeNav).toHaveBeenCalled();
    });

    it('should call showOrHide() after hideMenu()', () => {
        component.hideMenu();
        expect(methodsServiceSpy.showOrHide).toHaveBeenCalled();
    });

    it('should call hideMenu() after click text "Wszystkie"', () => {
        spyOn(component, "hideMenu");

        let text = elementDe.nativeElement.querySelector('a[routerLink]');
        text.click();

        fixture.detectChanges();

        expect(component.hideMenu).toHaveBeenCalled();
    });
});
