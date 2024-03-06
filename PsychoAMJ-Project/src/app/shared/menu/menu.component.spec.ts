import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { DebugElement } from '@angular/core';
import { FooterComponent } from './elements/footer/footer.component';
import { LogosComponent } from './elements/logos/logos.component';
import { NavComponent } from './elements/nav/nav.component';
import { SecNavComponent } from './elements/sec-nav/sec-nav.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CloudsAndStarsComponent } from '../animations/clouds-and-stars/clouds-and-stars.component';
import { By } from '@angular/platform-browser';
import { MethodsService } from '../../services/methods/methods.service';

describe('MenuComponent', () => {
    let fixture: ComponentFixture<MenuComponent>,
        mockMethodsService: MethodsService,
        component: MenuComponent,
        elementDe: DebugElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
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

        mockMethodsService = TestBed.inject(MethodsService);
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        elementDe = fixture.debugElement;
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).withContext('should create component').toBeTruthy();

        expect(elementDe.query(By.css('div .close'))).withContext('should create div with class .close').toBeTruthy();
        expect(elementDe.queryAll(By.css('a .x'))).withContext('should create a with class x').toBeTruthy();
        expect(elementDe.query(By.css('app-logos'))).withContext('should create app logos').toBeTruthy();
        expect(elementDe.query(By.css('app-nav'))).withContext('should create app nav').toBeTruthy();
        expect(elementDe.query(By.css('app-sec-nav'))).withContext('should create app sec nav').toBeTruthy();
        expect(elementDe.query(By.css('app-footer'))).withContext('should create app footer').toBeTruthy();
        expect(elementDe.query(By.css('app-clouds-and-stars'))).withContext('should create app clouds and stars').toBeTruthy();
    })

    describe('@Output', () => {

        it('should @Output work', () => {
            spyOn(component.animation, 'emit');
            component.changeAnimation(1);

            expect(component.animation.emit).withContext('should have been called').toHaveBeenCalled();
        })

    })

    describe('Nav', () => {

        it('should change nav', () => {
            component.changeNav('nav test');
            fixture.detectChanges();

            expect(component.nav).withContext('should change nav to "nav test"').toBe('nav test');
        })

    })

    describe('#showOrHide', () => {

        it('should hide menu', () => {
            spyOn(mockMethodsService, 'showOrHide');
            component.hideMenu();

            expect(mockMethodsService.showOrHide).withContext('should have been called').toHaveBeenCalled();
        })

    })
})
