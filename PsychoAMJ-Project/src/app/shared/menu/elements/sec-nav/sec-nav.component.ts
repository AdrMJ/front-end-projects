import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MethodsService } from '../../../../services/methods/methods.service';
import { BookService } from '../../../../services/book/book.service';
import { Book } from '../../../../modules/book/book';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sec-nav',
    templateUrl: './sec-nav.component.html',
    styleUrl: './sec-nav.component.css'
})
export class SecNavComponent {
    @Input() nav: string = "";

    @Output() animation = new EventEmitter<number>();

    books: Book[] = [];
    categories: string[] = [];
    private uniqueCategoriesSet: Set<string> = new Set<string>;

    private subscription: Subscription = new Subscription;

    constructor(
        private methodsService: MethodsService,
        private bookService: BookService,
    ) {  }

    ngOnInit(): void {
        this.subscribeBooks();
    }

    subscribeBooks() {
        if (this.bookService.getBooks() !== undefined) {
            this.subscription = this.bookService.getBooks().subscribe({
                next: (books) => {
                    this.books = books;
                    this.categories = books.map(book => book.details.category);
                    this.uniqueCategoriesSet = new Set(this.categories);
                    this.categories = Array.from(this.uniqueCategoriesSet);
                },
                error: (error) => {
                    console.error('Error loading books or categories: ', error);
                }
            })
        }
    }
    

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    hideMenu() {
        this.methodsService.showOrHide();
    }

    changeBodyBackground(value: string) {
        this.methodsService.changeBodyBackground(value);
    }

    changeAnimation(value: number) {
        this.animation.emit(value);
    }
}
