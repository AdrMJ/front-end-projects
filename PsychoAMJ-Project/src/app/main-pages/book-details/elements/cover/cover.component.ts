import { Component, Input } from '@angular/core';
import { Book } from '../../../../modules/book/book';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.css'
})
export class CoverComponent {
    @Input() book: Book | undefined;
}
