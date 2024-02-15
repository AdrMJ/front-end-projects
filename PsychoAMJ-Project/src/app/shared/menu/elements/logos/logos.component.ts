import { Component } from '@angular/core';
import { MethodsService } from '../../../../services/methods/methods.service';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  styleUrl: './logos.component.css'
})
export class LogosComponent {
    constructor(private methodsService:MethodsService){}

    showOrHideMenu() {
        this.methodsService.showOrHide();
    }
    alert(){
        alert("Work in progress");
    }
}
