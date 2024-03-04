import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { DebugElement } from '@angular/core';
import { FooterComponent } from './elements/footer/footer.component';
import { LogosComponent } from './elements/logos/logos.component';
import { NavComponent } from './elements/nav/nav.component';
import { SecNavComponent } from './elements/sec-nav/sec-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CloudsAndStarsComponent } from '../animations/clouds-and-stars/clouds-and-stars.component';
import { By } from '@angular/platform-browser';
import { MethodsService } from '../../services/methods/methods.service';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    let mockMethodsService: MethodsService;

    let elementDe: DebugElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule,
            ],
            declarations: [
                MenuComponent,
                FooterComponent,
                LogosComponent,
                NavComponent,
                SecNavComponent,
                CloudsAndStarsComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MenuComponent);
        mockMethodsService = TestBed.inject(MethodsService);

        component = fixture.componentInstance;
        elementDe = fixture.debugElement;

        fixture.detectChanges();
    });

    describe('HTML elements', () => {
        it('should create', () => {
            expect(component).toBeTruthy();

            expect(elementDe.query(By.css('div .close'))).withContext('should create div with class .close').toBeTruthy();
            expect(elementDe.queryAll(By.css('a .x'))).withContext('should create a with class x').toBeTruthy();
            expect(elementDe.query(By.css('app-logos'))).withContext('should create app logos').toBeTruthy();
            expect(elementDe.query(By.css('app-nav'))).withContext('should create app nav').toBeTruthy();
            expect(elementDe.query(By.css('app-sec-nav'))).withContext('should create app sec nav').toBeTruthy();
            expect(elementDe.query(By.css('app-footer'))).withContext('should create app footer').toBeTruthy();
            expect(elementDe.query(By.css('app-clouds-and-stars'))).withContext('should create app clouds and stars').toBeTruthy();
        });
    });

    describe('@Output', () => {
        it('should @Output work', () => {
            spyOn(component.animation, 'emit');
            component.changeAnimation(1);

            expect(component.animation.emit).withContext('should have been called').toHaveBeenCalled();
        });
    });

    describe('Nav', () => {
        it('should change nav', () => {
            component.changeNav('nav test');
            fixture.detectChanges();

            expect(component.nav).withContext('should change nav to "nav test"').toBe('nav test');
        });
    });

    describe('other methods', () => {
        it('should hide menu', () => {
            spyOn(mockMethodsService, 'showOrHide');
            component.hideMenu();

            expect(mockMethodsService.showOrHide).withContext('should have been called').toHaveBeenCalled();
        });
    });
});
