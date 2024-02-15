import { MethodsService } from './../../../../services/methods/methods.service';
import { Component, Input, Output } from '@angular/core';
import { Book } from '../../../../modules/book/book';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent {
    @Input() book: Book | undefined;
    @Input() detailsCategory: string = "";
}
