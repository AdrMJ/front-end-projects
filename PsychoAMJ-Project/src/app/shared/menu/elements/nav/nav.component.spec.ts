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
    let methodsServiceSpy: jasmine.SpyObj<MethodsService>,
        fixture: ComponentFixture<NavComponent>,
        component: NavComponent,
        elementDe: DebugElement,
        location: Location,
        router: Router;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MethodsService', ['showOrHide']),
            routes = [
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

        methodsServiceSpy = TestBed.inject(MethodsService) as jasmine.SpyObj<MethodsService>;
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        location = TestBed.inject(Location);
        elementDe = fixture.debugElement;
        router = TestBed.inject(Router);

        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).withContext('should create component').toBeTruthy();

        expect(elementDe.query(By.css('.nav'))).withContext('should create div with class nav').toBeTruthy();
        expect(elementDe.query(By.css('ul'))).withContext('should create ul').toBeTruthy();
        expect(elementDe.queryAll(By.css('li')).length).withContext('should create li').toEqual(elementDe.queryAll(By.css('a')).length);
    })

    describe('#fakeAsync', () => {

        it("fakeAsync works", fakeAsync(() => {
            let promise = new Promise(resolve => {
                setTimeout(resolve, 10);
            }),
                done = false;
            promise.then(() => (done = true));
            tick(50);
            expect(done).withContext('should done be truthy').toBeTruthy();
        }))

    })

    describe('@Output', () => {

        it('should emit after use changeNav', () => {
            spyOn(component.nav, 'emit');

            component.changeNav('categories');
            fixture.detectChanges();

            expect(component.nav.emit).withContext('should have been called with categories').toHaveBeenCalledWith('categories');
        })

        it('should emit after click #categories', () => {
            const aCategories = elementDe.nativeElement.querySelector('#categories');
            spyOn(component.nav, 'emit');

            aCategories.click();
            fixture.detectChanges();

            expect(component.nav.emit).withContext('should have been called with categories').toHaveBeenCalledWith('categories');
        })

    })

    describe('Navigation', () => {

        it('router should navigate to /all', fakeAsync(() => {
            router.navigate(['all']);
            tick();
            expect(location.path()).toBe('/all');
        }))

        it('routerLink should navigate to /all', fakeAsync(() => {
            let aAll = elementDe.nativeElement.querySelector('#all');
            aAll.click();

            tick();

            expect(location.path()).withContext('should navigate to /all').toBe('/all');
        }))

    })

    describe('#changeNav', () => {

        it('should have been called after click text category', () => {
            let textCategories = fixture.nativeElement.querySelector('#categories');
            spyOn(component, "changeNav");

            textCategories.click();
            fixture.detectChanges();

            expect(component.changeNav).withContext('should have been called').toHaveBeenCalled();
        })

        it('should have been called after click text titles', () => {
            let textTitles = elementDe.nativeElement.querySelector('#titles');
            spyOn(component, "changeNav");

            textTitles.click();
            fixture.detectChanges();

            expect(component.changeNav).withContext('should have been called').toHaveBeenCalled();
        })

        it('should have been called after click text themes', () => {
            let textThemes = elementDe.nativeElement.querySelector('#themes');
            spyOn(component, "changeNav");

            textThemes.click();
            fixture.detectChanges();

            expect(component.changeNav).withContext('should have been called').toHaveBeenCalled();
        })

    })

    describe('#showOrHide', () => {

        it('should have been called after hideMenu()', () => {
            component.hideMenu();

            expect(methodsServiceSpy.showOrHide).withContext('should have been called').toHaveBeenCalled();
        })
    })

    describe('#hideMenu', () => {

        it('should have been called after click text "Wszystkie"', () => {
            let text = elementDe.nativeElement.querySelector('a[routerLink]');
            spyOn(component, "hideMenu");

            text.click();
            fixture.detectChanges();

            expect(component.hideMenu).withContext('should have been called').toHaveBeenCalled();
        })

    })

})
