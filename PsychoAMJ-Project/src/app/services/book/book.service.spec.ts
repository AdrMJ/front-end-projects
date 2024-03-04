import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from '../../modules/book/book';

describe('BookService', () => {

    let httpTestingController: HttpTestingController,
        service: BookService,
        expectedBooks: Book[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookService]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(BookService);

        expectedBooks = [
            {
                id: 1,
                title: "title",
                isStillAvailable: 1,
                authors: {
                    authorsId: 1,
                    imageMaker: "imageMaker",
                    coverDeveloper: "coverDeveloper",
                    illustrator: "illustrator",
                    writers: "writers"
                },
                details: {
                    detailsId: 1,
                    pageCount: 66,
                    category: "category",
                    aboutBook: "aboutBook"

                },
                publication: {
                    publicationId: 1,
                    publisher: "publisher",
                    language: "language",
                    releaseDate: new Date(5000000),
                    publisherUrl: "publisherUrl"
                },
                imageUrl: {
                    imageUrlId: 1,
                    frontUrl: "frontUrl",
                    backUrl: "backUrl",
                    sideUrl: "sideUrl",
                    color: "color"
                },
                introWords: [
                    {
                        introWordsId: 1,
                        introWords: "introWords",
                        authorOfWords: "author"
                    },
                    {
                        introWordsId: 2,
                        introWords: "introWords2",
                        authorOfWords: "author2"
                    }
                ]
            },
            {
                id: 2,
                title: "title2",
                isStillAvailable: 0,
                authors: {
                    authorsId: 2,
                    imageMaker: "imageMaker2",
                    coverDeveloper: "coverDeveloper2",
                    illustrator: "illustrator2",
                    writers: "writers2"
                },
                details: {
                    detailsId: 2,
                    pageCount: 66,
                    category: "category2",
                    aboutBook: "aboutBook2"

                },
                publication: {
                    publicationId: 2,
                    publisher: "publisher2",
                    language: "language2",
                    releaseDate: new Date(5000000),
                    publisherUrl: "publisherUrl2"
                },
                imageUrl: {
                    imageUrlId: 2,
                    frontUrl: "frontUrl2",
                    backUrl: "backUrl2",
                    sideUrl: "sideUrl2",
                    color: "color2"
                },
                introWords: [
                    {
                        introWordsId: 3,
                        introWords: "introWords3",
                        authorOfWords: "author3"
                    },
                    {
                        introWordsId: 4,
                        introWords: "introWords4",
                        authorOfWords: "author4"
                    }
                ]
            },
        ];
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getBooks', () => {

        it('should return expected books', () => {
            service.getBooks().subscribe({
                next: (books) =>
                    expect(books).withContext('should return expected books').toEqual(expectedBooks),
                error: fail,
            });

            const req = httpTestingController.expectOne(service.url + `all`);
            expect(req.request.method).toEqual('GET');

            req.flush(expectedBooks);
        });
    });

    describe('#getBookById', () => {

        it('should return expected book', () => {
            let expectedBook: Book;
            for (let id = 1; id < 3; id++) {
                expectedBook = expectedBooks[id - 1];
                service.getBookById(id).subscribe({
                    next: (book: Book) => {
                        expect(book).toContain(expectedBook);
                    },
                    error: fail,
                });

                const req = httpTestingController.expectOne(service.url + `id/${id}`);
                expect(req.request.method).toEqual('GET');

                req.flush(expectedBooks);
            }
        });
    });

    describe('#getBooksByCategory', () => {

        it('should return books by category', () => {

            for (let i = 0; i <= 1; i++) {
                let category: string = `category`;
                if (i == 1) {
                    category += 2;
                }
                service.getBookByCategory(category).subscribe({
                    next: (books) => {
                        expect(books).withContext('should return expected books by category').toContain(expectedBooks[i])
                    },
                    error: fail,
                });

                const req = httpTestingController.expectOne(service.url + `category/${category}`);
                expect(req.request.method).toEqual('GET');

                req.flush(expectedBooks);
            }
        })
    });
});