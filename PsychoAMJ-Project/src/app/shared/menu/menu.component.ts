import { MethodsService } from './../../services/methods/methods.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent {
    nav: string = "";

    @Output() animation = new EventEmitter<number>();

    constructor(private methodsService: MethodsService) { }

    changeAnimation(value: number) {
        this.animation.emit(value);
    }

    changeNav(value: string) {
        this.nav = value;
    }

    hideMenu() {
        this.methodsService.showOrHide();
    }
}
