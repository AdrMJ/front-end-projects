import { MethodsService } from './../../../../services/methods/methods.service';
import { Component, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    @Output() nav = new EventEmitter<string>();

    changeNav(value: string) {
        this.nav.emit(value);
    }

    constructor(private methodsService:MethodsService){}

    hideMenu() {
        this.methodsService.showOrHide();
    }
}
