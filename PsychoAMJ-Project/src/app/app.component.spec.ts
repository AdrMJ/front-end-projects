import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ColorfulSmokeAnimationComponent } from './shared/animations/colorful-smoke-animation/colorful-smoke-animation.component';
import { BlackSmokeAnimationComponent } from './shared/animations/black-smoke-animation/black-smoke-animation.component';
import { WhiteSmokeAnimationComponent } from './shared/animations/white-smoke-animation/white-smoke-animation.component';
import { LogosComponent } from './shared/menu/elements/logos/logos.component';
import { NavComponent } from './shared/menu/elements/nav/nav.component';
import { SecNavComponent } from './shared/menu/elements/sec-nav/sec-nav.component';
import { CloudsAndStarsComponent } from './shared/animations/clouds-and-stars/clouds-and-stars.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FooterComponent } from './shared/menu/elements/footer/footer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MethodsService } from './services/methods/methods.service';

describe('AppComponent', () => {
    let component: AppComponent,
        fixture: ComponentFixture<AppComponent>,
        mockMethodsService: MethodsService,
        elementDe: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            declarations: [
                AppComponent,

                ColorfulSmokeAnimationComponent,
                BlackSmokeAnimationComponent,
                WhiteSmokeAnimationComponent,
                CloudsAndStarsComponent,

                MenuComponent,
                LogosComponent,
                NavComponent,
                SecNavComponent,
                FooterComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        mockMethodsService = TestBed.inject(MethodsService);

        component = fixture.componentInstance;
        elementDe = fixture.debugElement;
    })

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent),
            app = fixture.componentInstance;
        expect(app).withContext('should create app component').toBeTruthy();
    })

    describe('HTML elements', () => {

        it('should create HTML elements', () => {
            expect(elementDe.queryAll(By.css('a #dots'))).withContext('should create a with id dots').toBeTruthy();
            expect(elementDe.queryAll(By.css('div #main-page'))).withContext('should create div with id main-page').toBeTruthy();
            expect(elementDe.queryAll(By.css('router-outlet'))).withContext('should create router-outlet').toBeTruthy();
            expect(elementDe.queryAll(By.css('app-menu #menu'))).withContext('should create app-menu with id menu').toBeTruthy();
            expect(elementDe.queryAll(By.css('div .animaiton'))).withContext('should create div with class animation').toBeTruthy();
            expect(elementDe.queryAll(By.css('app-colorful-smoke-animation'))).withContext('should create app-colorful-smoke-animation').toBeTruthy();
            expect(elementDe.queryAll(By.css('app-black-smoke-animation'))).withContext('should create app-black-smoke-animation').toBeTruthy();
            expect(elementDe.queryAll(By.css('app-white-smoke-animation'))).withContext('should create app-white-smoke-animation').toBeTruthy();
        })

    })

    describe('#changeAnimation', () => {

        it('should change animation value', () => {
            component.changeAnimation(1);
            fixture.detectChanges();

            expect(component.animation).withContext('should change animation').toEqual(1);
        })

        it('should create component with animation', () => {
            component.changeAnimation(1);
            fixture.detectChanges();

            expect(elementDe.query(By.css('app-colorful-smoke-animation'))).withContext('should create ColorfulSmokeAnimationComponent').toBeTruthy();

            component.changeAnimation(2);
            fixture.detectChanges();

            expect(elementDe.query(By.css('app-black-smoke-animation'))).withContext('should create BlackSmokeAnimationComponent').toBeTruthy();

            component.changeAnimation(3);
            fixture.detectChanges();

            expect(elementDe.query(By.css('app-white-smoke-animation'))).withContext('should create WhiteSmokeAnimationComponent').toBeTruthy();
        })

    })

    describe('#showMenu', () => {

        it('should show or hide menu', () => {
            spyOn(mockMethodsService, 'showOrHide');
            component.showMenu();

            expect(mockMethodsService.showOrHide).withContext('should call showOrHide method').toHaveBeenCalled();
        })

    })

})
