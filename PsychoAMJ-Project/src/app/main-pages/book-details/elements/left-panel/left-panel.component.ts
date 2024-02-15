import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent {
    @Output() detailsCategory = new EventEmitter<string>();

    changeDetailsCategory(value: string) {
        this.detailsCategory.emit(value);
    }
}
