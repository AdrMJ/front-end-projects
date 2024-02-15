import { Component, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import VanillaTilt from 'vanilla-tilt';
import { Book } from '../../modules/book/book';
import { BookService } from '../../services/book/book.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
    selector: 'app-book-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './book-list.component.html',
    styleUrl: './book-list.component.css'
})
export class BookListComponent {

    books: Book[] = [];
    category: string = "";

    private subscription: Subscription = new Subscription;


    constructor(
        private bookService: BookService,
        private el: ElementRef,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.category = params['category'];
        });
        this.subscribeBooks(this.category);
    }

    subscribeBooks(category: string) {
        if (!category) {
            this.subscription = this.bookService.getBooks().subscribe({
                next: (books) => {
                    this.books = books;
                    this.addVanillaTilt();
                },
                error: (error) => {
                    console.error('Error loading books: ', error);
                }
            })
        } else {
            this.subscription = this.bookService.getBookByCategory(category).subscribe({
                next: (books) => {
                    this.books = books.filter(book => book.details.category.includes(category));
                    this.addVanillaTilt();
                },
                error: (error) => {
                    console.error('Error loading books by category: ', error);
                }
            })
        }

    }
    addVanillaTilt(): void {
        setTimeout(() => {
            VanillaTilt.init(
                this.el.nativeElement.querySelectorAll(".card"), {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 1
            }
            );
        })
    };

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
