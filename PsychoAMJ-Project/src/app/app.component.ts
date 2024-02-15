import { Component, Inject } from '@angular/core';
import { MethodsService } from './services/methods/methods.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    animation: number = -5;

    constructor(private methodsService: MethodsService) { }

    changeAnimation(value: number) {
        this.animation = value;
    }

    showMenu() {
        this.methodsService.showOrHide();
    }

}

