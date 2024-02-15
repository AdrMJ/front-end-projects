import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MethodsService } from '../../../../services/methods/methods.service';
import { BookService } from '../../../../services/book/book.service';
import { DebugElement } from '@angular/core';
import { SecNavComponent } from './sec-nav.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookDetailsComponent } from '../../../../main-pages/book-details/book-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BookListComponent } from '../../../../main-pages/book-list/book-list.component';
import { Book } from '../../../../modules/book/book';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs';

describe('SecNavComponent', () => {
    let component: SecNavComponent;
    let fixture: ComponentFixture<SecNavComponent>;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    let methodsServiceSpy: MethodsService;
    let bookServiceSpy: BookService;
    let navComponentSpy: NavComponent;

    let elementDe: DebugElement;
    let router: Router;
    let location: Location;

    beforeEach(() => {
        const bookService = jasmine.createSpyObj('BookService', ['getBooks']);
        const methodsService = jasmine.createSpyObj('MethodsService', ['showOrHide', 'changeBodyBackground']);
        const navComponent = jasmine.createSpyObj('NavComponent', ['hideMenu', 'changeBodyBackground', 'changeAnimation']);
        const routes = [
            {
                path: 'category/:category', component: BookListComponent
            },
            {
                path: 'id/:id', component: BookDetailsComponent
            },
        ]

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: MethodsService, useValue: methodsService
                },
                {
                    provide: NavComponent, useValue: navComponent
                },
                {
                    provide: BookService, useValue: bookService
                }
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes),
            ],
            declarations: [SecNavComponent]
        }).compileComponents();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

        fixture = TestBed.createComponent(SecNavComponent);
        component = fixture.componentInstance;

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        bookServiceSpy = TestBed.inject(BookService) as BookService;
        methodsServiceSpy = TestBed.inject(MethodsService) as MethodsService;
        navComponentSpy = TestBed.inject(NavComponent) as NavComponent;

        elementDe = fixture.debugElement;
        component.categories = [
            "category",
            "testCategory"
        ];
        component.books = [
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
    });

    afterEach(() =>
        httpTestingController.verify()
    );

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(elementDe.query(By.css('.nav'))).withContext("should create .nav").toBeTruthy();
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

    // Switch tests
    it('should input working', () => {
        component.nav = 'nav test';
        fixture.detectChanges();

        expect(component.nav).withContext("should change nav's value").toEqual('nav test');
    });

    //Categories
    it('should create by case with value "categories"', () => {
        component.nav = "categories";
        fixture.detectChanges();

        expect(elementDe.queryAll(By.css(".categoriesPanel"))).withContext("should create .categoriesPanel").toBeTruthy();
        expect(elementDe.queryAll(By.css(".categoriesPanel")).length).withContext("should create the same number of .categoriesPanel as categories").toEqual(component.categories.length);
        expect(elementDe.queryAll(By.css("li"))).withContext("should create li").toBeTruthy();
        expect(elementDe.queryAll(By.css("li")).length).withContext("should create the same number of li as categories").toEqual(component.categories.length);
        expect(elementDe.queryAll(By.css("a"))).withContext("should create a").toBeTruthy();
        expect(elementDe.queryAll(By.css("a")).length).withContext("should create the same number of a as categories").toEqual(component.categories.length);
    });

    it('should navigate by categories', fakeAsync(() => {
        component.nav = "categories";
        fixture.detectChanges();

        const allA = elementDe.queryAll(By.css("a"));
        for (let i = 0; i < component.categories.length; i++) {
            allA[i].nativeElement.click();

            tick();

            expect(location.path()).withContext("should navigate to /category/:category").toBe('/category/' + component.categories[i]);
        }
    }));

    it('should call hideMenu() on click', fakeAsync(() => {
        spyOn(component, "hideMenu");
        component.nav = "categories";
        fixture.detectChanges();

        const allA = elementDe.queryAll(By.css("a"));
        for (let i = 0; i < component.categories.length; i++) {
            allA[i].nativeElement.click();
        }
        tick();
        expect(component.hideMenu).toHaveBeenCalledTimes(2);
    }));

    //Titles
    it('should create by case with value "titles"', () => {
        component.nav = "titles";
        fixture.detectChanges();

        expect(elementDe.queryAll(By.css(".titlesPanel"))).withContext("should create .titlesPanel").toBeTruthy();
        expect(elementDe.queryAll(By.css(".titlesPanel")).length).withContext("should create the same number of .titlesPanel as books").toEqual(component.books.length);
        expect(elementDe.queryAll(By.css("li"))).withContext("should create li").toBeTruthy();
        expect(elementDe.queryAll(By.css("li")).length).withContext("should create the same number of li as books").toEqual(component.books.length);
        expect(elementDe.queryAll(By.css("a"))).withContext("should create a").toBeTruthy();
        expect(elementDe.queryAll(By.css("a")).length).withContext("should create the same number of a as books").toEqual(component.books.length);
    });

    it('should navigate by id', fakeAsync(() => {
        component.nav = "titles";
        fixture.detectChanges();

        const allA = elementDe.queryAll(By.css("a"));
        for (let i = 0; i < component.books.length; i++) {
            allA[i].nativeElement.click();

            tick();

            expect(location.path()).withContext("should navigate to /id/:id").toBe('/id/' + component.books[i].id);
        }
    }));

    it('should call hideMenu() on click', fakeAsync(() => {
        spyOn(component, "hideMenu");
        component.nav = "titles";
        fixture.detectChanges();

        const allA = elementDe.queryAll(By.css("a"));
        for (let i = 0; i < component.books.length; i++) {
            allA[i].nativeElement.click();
        }
        tick();
        expect(component.hideMenu).toHaveBeenCalledTimes(2);
    }));


    // Themes
    it('should create by case with value "themes"', () => {
        component.nav = 'themes';
        fixture.detectChanges();

        expect(elementDe.queryAll(By.css('.themesPanel'))).withContext("should create .themesPanel").toBeTruthy();
        expect(elementDe.queryAll(By.css('.themesPanel .chooseTheme')).length).withContext("should create 4 .chooseTheme").toEqual(4);
        expect(elementDe.queryAll(By.css('.chooseTheme .text')).length).withContext("should create 4 .text in .chooseTheme").toEqual(4);
        expect(elementDe.queryAll(By.css('.chooseTheme img')).length).withContext("should create 4 img in .chooseTheme").toEqual(4);
    });

    it('should call hideMenu(), changeBodyBackground and changeAnimation after click div with class .chooseTheme', fakeAsync(() => {
        spyOn(component.animation, 'emit');
        spyOn(component, "hideMenu");
        spyOn(component, "changeBodyBackground");
        spyOn(component, "changeAnimation");
        component.nav = 'themes';
        fixture.detectChanges();


        const allA = elementDe.queryAll(By.css(".chooseTheme"));
        for (let i = 0; i < 4; i++) {
            allA[i].nativeElement.click();
        }
        tick();
        expect(component.hideMenu).withContext('should hideMenu called 4 times').toHaveBeenCalledTimes(4);
        expect(component.changeBodyBackground).withContext('should changeBodyBackground called 4 times').toHaveBeenCalledTimes(4);
        expect(component.changeAnimation).withContext('should changeAnimation called 4 times').toHaveBeenCalledTimes(4);
    }));

    it('should @Output should have been called with 1 after use changeAnimation', () => {
        spyOn(component.animation, 'emit');
        component.nav = 'themes';
        fixture.detectChanges();
        component.changeAnimation(1);

        expect(component.animation.emit).withContext('should have been called with 1').toHaveBeenCalledWith(1);
    });

    it('should @Output should have been called with 1 after click .chooseTheme', () => {
        spyOn(component.animation, 'emit');
        component.nav = 'themes';
        fixture.detectChanges();

        const first = elementDe.nativeElement.querySelector('#first');
        const sec = elementDe.nativeElement.querySelector('#second');
        const third = elementDe.nativeElement.querySelector('#third');
        const fourth = elementDe.nativeElement.querySelector('#fourth');

        first.click();
        fixture.detectChanges();
        expect(component.animation.emit).withContext('should have been called with 1').toHaveBeenCalledWith(1);

        sec.click();
        fixture.detectChanges();
        expect(component.animation.emit).withContext('should have been called with 1').toHaveBeenCalledWith(1);

        third.click();
        fixture.detectChanges();
        expect(component.animation.emit).withContext('should have been called with 2').toHaveBeenCalledWith(2);

        fourth.click();
        fixture.detectChanges();
        expect(component.animation.emit).withContext('should have been called with 1').toHaveBeenCalledWith(3);
    });

    // Default
    it('should create by switch default', () => {
        component.nav = '';
        fixture.detectChanges();

        expect(elementDe.queryAll(By.css(".defaultPanel"))).withContext("should create .defaultPanel").toBeTruthy();
    });

    it('should call getBooks and return list of books and set of categories', fakeAsync(() => {
        let response: Book[] = [];

        bookServiceSpy.getBooks = jasmine.createSpy().and.returnValue(response);

        component.subscribeBooks();
        tick();
        expect(component.books).toEqual(response);
    }));
});
