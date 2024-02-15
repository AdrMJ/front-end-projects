import { MethodsService } from './../../../../services/methods/methods.service';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {

    constructor(private methodsService: MethodsService) { }

    showOrHide(){
        this.methodsService.showOrHideClouds();
    }
}
