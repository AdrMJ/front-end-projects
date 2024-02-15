import { Subscription } from 'rxjs';

import { Component, Input, inject } from '@angular/core';
import { Book } from '../../modules/book/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book/book.service';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css'
})

export class BookDetailsComponent {
    detailsCategory: string = "";

    subscription: Subscription = new Subscription;
    route: ActivatedRoute = inject(ActivatedRoute);
    bookService = inject(BookService);
    book: Book | undefined;

    constructor() {
        const bookId = Number(this.route.snapshot.params['id']);
        this.subscription = this.bookService.getBookById(bookId).subscribe({
            next: (data: Book) => {
                this.book = data;
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    changeDetailsCategory(value: string) {
        this.detailsCategory = value;
        console.log(value);
    }

}
