import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BookService } from '../../services/book/book.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { of } from 'rxjs';

describe('BookListComponent', () => {
    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;

    let httpTestingController: HttpTestingController;

    let elementDe: DebugElement;
    let bookServiceSpy: BookService;

    let router: Router;
    let location: Location;

    const mockBooks = [
        {
            id: 1,
            title: "title1",
            isStillAvailable: 0,
            authors: {
                authorsId: 1,
                imageMaker: "imageMaker1",
                coverDeveloper: "coverDeveloper1",
                illustrator: "illustrator1",
                writers: "writers1"
            },
            details: {
                detailsId: 1,
                pageCount: 50,
                category: "category",
                aboutBook: "aboutBook"
            },
            imageUrl: {
                imageUrlId: 1,
                frontUrl: "frontUrl1",
                backUrl: "backUrl1",
                sideUrl: "sideUrl1",
                color: "color1"
            },
            publication: {
                publicationId: 1,
                publisher: "publisher1",
                language: "language1",
                releaseDate: new Date(),
                publisherUrl: "publisherUrl1"
            },
            introWords: [
                {
                    introWordsId: 1,
                    introWords: "introWords1",
                    authorOfWords: "authorOfWords1"
                },
                {
                    introWordsId: 2,
                    introWords: "introWords2",
                    authorOfWords: "authorOfWords2"
                }
            ],
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
                pageCount: 50,
                category: "category2",
                aboutBook: "aboutBook2"
            },
            imageUrl: {
                imageUrlId: 2,
                frontUrl: "frontUrl2",
                backUrl: "backUrl2",
                sideUrl: "sideUrl2",
                color: "color2"
            },
            publication: {
                publicationId: 2,
                publisher: "publisher2",
                language: "language2",
                releaseDate: new Date(),
                publisherUrl: "publisherUrl2"
            },
            introWords: [
                {
                    introWordsId: 3,
                    introWords: "introWords3",
                    authorOfWords: "authorOfWords3"
                },
                {
                    introWordsId: 4,
                    introWords: "introWords4",
                    authorOfWords: "authorOfWords4"
                }
            ],
        }
    ];
    const mockBooksByCategory = mockBooks.filter(book => book.details.category.includes('category'));

    beforeEach(async () => {
        const bookServiceSpyObj = jasmine.createSpyObj('BookService', ['getBooks', 'getBookByCategory']);
        const methodsServiceSpyObj = jasmine.createSpyObj('MethodsService', ['showOrHide', 'changeBodyBackground']);
        const routes = [
            {
                path: 'category/:category', component: BookListComponent
            },
            {
                path: 'id/:id', component: BookDetailsComponent
            },
        ]

        await TestBed.configureTestingModule({
            providers: [
                {
                    provide: BookService, useValue: bookServiceSpyObj
                },
            ],
            imports: [
                CommonModule,
                RouterLink,
                BookListComponent,
                HttpClientTestingModule,
                HttpClientModule,
                RouterTestingModule.withRoutes(routes),
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(BookListComponent);
        component = fixture.componentInstance;

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        bookServiceSpy = TestBed.inject(BookService) as BookService; 
        httpTestingController = TestBed.inject(HttpTestingController);

        elementDe = fixture.debugElement;
    });

    afterEach(() =>
        httpTestingController.verify()
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("fakeAsync works", fakeAsync(() => {
        let promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => (done = true));
        tick(50);
        expect(done).toBeTruthy();
    }));

    //test router
    it('router should navigate', fakeAsync(() => {
        router.navigate(['category/testRouter']);
        tick();
        
        expect(location.path()).withContext("should navigate").toBe('/category/testRouter');

    }));

    it('should subscribe books', fakeAsync(() => {
        bookServiceSpy.getBooks = jasmine.createSpy().and.returnValue(of([mockBooks]));
        let subSpy = spyOn(bookServiceSpy.getBooks(), 'subscribe');

        component.ngOnInit();
        tick();
        
        expect(bookServiceSpy.getBooks).toHaveBeenCalledBefore(subSpy);
        expect(subSpy).toHaveBeenCalled();
    }));


    it('should create elements after subscribe books', () =>{        
        bookServiceSpy.getBooks = jasmine.createSpy().and.returnValue(of([mockBooks]));
        spyOn(bookServiceSpy.getBooks(), 'subscribe');

        component.ngOnInit();
        fixture.detectChanges();

        expect(elementDe.queryAll(By.css('.container')).length).withContext('should create div with class container').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.card')).length).withContext('should create div with class card').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.background')).length).withContext('should create div with class background').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.content')).length).withContext('should create div with class content').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.number')).length).withContext('should create h2 with class number').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.title')).length).withContext('should create h3 with class title').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.moreInfo')).length).withContext('should create div with class moreInfo').toEqual(component.books.length);
    });

    it('should create elements after subscribe books by category', () =>{
        
        bookServiceSpy.getBookByCategory = jasmine.createSpy().and.returnValue(of([mockBooksByCategory]));
        spyOn(bookServiceSpy.getBookByCategory('category'), 'subscribe');
        spyOn(component, 'subscribeBooks');

        component.ngOnInit();
        fixture.detectChanges();

        expect(elementDe.queryAll(By.css('.container')).length).withContext('should create div with class container').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.card')).length).withContext('should create div with class card').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.background')).length).withContext('should create div with class background').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.content')).length).withContext('should create div with class content').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.number')).length).withContext('should create h2 with class number').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.title')).length).withContext('should create h3 with class title').toEqual(component.books.length);
        expect(elementDe.queryAll(By.css('.moreInfo')).length).withContext('should create div with class moreInfo').toEqual(component.books.length);
    });

});
