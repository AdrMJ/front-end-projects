import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MethodsService {

    constructor() { }


    showOrHide(): void {
        this.showOrHideMenu();
        this.showOrHideElements();
    }

    changeBodyBackground(value: string): void {
        document.body.style.backgroundColor = value;
    }


    showOrHideClouds(): void {
        let clouds = document.getElementById("clouds");

        if (clouds) {
            if (clouds.style.visibility === "visible") {
                clouds.style.visibility = "hidden";
            }
            else {
                clouds.style.visibility = "visible";
            }
        } else {
            console.error("'Clouds' not found");
        }
    }

    showOrHideMenu(): void {
        let menu = document.getElementById("menu");

        if (menu) {
            if (menu.style.visibility == "visible") {
                menu.style.visibility = "hidden";
                menu.style.transform = "translateX(-100vw)";
            } else {
                menu.style.visibility = "visible";
                menu.style.transform = "translateX(0vw)";
            }
        }
        else {
            console.error("'Menu' not found");
        }
    }
    showOrHideElements(): void {
        let elements: HTMLCollectionOf<Element> = document.getElementsByClassName('elements');
        let elementArray: HTMLElement[] = Array.from(elements) as HTMLElement[];
        let dots = document.getElementById('dots');

        if (elements && dots) {
            if (dots.style.visibility == "hidden") {
                for (let element of elementArray) {
                    element.style.transition = "0s";
                    element.style.visibility = "visible";
                }
            } else {
                for (let element of elementArray) {
                    element.style.transition = "0s";
                    element.style.visibility = "hidden";
                }
            }
        } else {
            console.error("'Elements' or 'dots' not found");
        }
    }


}
