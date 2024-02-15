import { TestBed } from '@angular/core/testing';

import { MethodsService } from './methods.service';
import { delay } from 'rxjs';

describe('MethodsService', () => {
    let service: MethodsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MethodsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should change body background color', () => {
        service.changeBodyBackground('white');
        expect(document.body.style.backgroundColor).toBe('white');
    });

    it('should change visibility for clouds', () => {

        let clouds = document.createElement('div');
        clouds.id = 'clouds';
        document.body.appendChild(clouds);

        const cloudsSpy = spyOn(document, 'getElementById').and.returnValue(clouds);

        const oldVisibility = 'visible';
        clouds.style.visibility = oldVisibility;

        service.showOrHideClouds();
        expect(cloudsSpy).toHaveBeenCalledWith('clouds');
        expect(clouds.style.visibility).not.toBe(oldVisibility);

        service.showOrHideClouds();
        expect(cloudsSpy).toHaveBeenCalledWith('clouds');
        expect(clouds.style.visibility).toBe(oldVisibility);

        document.body.removeChild(clouds);
    });

    it('should call showOrHideMenu() and showOrHideElements()', () => {

        spyOn(service, 'showOrHideMenu');
        spyOn(service, 'showOrHideElements');

        service.showOrHide();

        expect(service.showOrHideMenu).toHaveBeenCalled();
        expect(service.showOrHideElements).toHaveBeenCalled();

    });

    it('should change visibility and transform for menu', () => {
        let menu = document.createElement('div');
        menu.id = 'menu';
        document.body.appendChild(menu);

        const menuSpy = spyOn(document, 'getElementById').and.returnValue(menu);

        const oldVisibility = 'hidden';
        const oldTransform = 'translateX(-100vw)';

        menu.style.visibility = oldVisibility;
        menu.style.transform = oldTransform;

        service.showOrHide();
        expect(menuSpy).toHaveBeenCalledWith('menu');
        expect(menu.style.visibility).not.toBe(oldVisibility);
        expect(menu.style.transform).not.toBe(oldTransform);

        service.showOrHide();
        expect(menuSpy).toHaveBeenCalledWith('menu');
        expect(menu.style.visibility).toBe(oldVisibility);
        expect(menu.style.transform).toBe(oldTransform);

        document.body.removeChild(menu);
    });

    it('should change visibility and transition for elements', () => {
        let element1 = document.createElement('div');
        element1.className = 'elements';
        document.body.appendChild(element1);

        let element2 = document.createElement('div');
        element2.className = 'elements';
        document.body.appendChild(element2);

        let dots = document.createElement('div');
        dots.id = 'dots';
        dots.className = "elements";
        document.body.appendChild(dots);

        let elements: HTMLElement[] = [element1, element2, dots];

        const oldVisibility = 'visible';
        const oldTransition = '0s';

        for (let element of elements) {
            element.style.visibility = oldVisibility;
            element.style.transitionDelay = oldTransition;
        }

        service.showOrHide();
        for (let element of elements) {
            expect(element.style.visibility).not.toBe(oldVisibility);
            expect(element.style.transitionDelay).toBe(oldTransition);
        }
        service.showOrHide();
        for (let element of elements) {
            expect(element.style.visibility).toBe(oldVisibility);
            expect(element.style.transitionDelay).toBe(oldTransition);
        }
    });
});
