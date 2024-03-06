import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { LeftPanelComponent } from './elements/left-panel/left-panel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoverComponent } from './elements/cover/cover.component';
import { RightPanelComponent } from './elements/right-panel/right-panel.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { of } from 'rxjs/internal/observable/of';

describe('BookDetailsComponent', () => {
    let fixture: ComponentFixture<BookDetailsComponent>,
        component: BookDetailsComponent,
        bookServiceSpy: BookService,
        elementDe: DebugElement,
        location: Location,
        router: Router;

    beforeEach(() => {
        const routes = [
            {
                path: 'id/:id', component: BookDetailsComponent
            },
        ];

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [
                BookDetailsComponent,
                LeftPanelComponent,
                CoverComponent,
                RightPanelComponent
            ]
        }).compileComponents();


        bookServiceSpy = TestBed.inject(BookService) as BookService;
        fixture = TestBed.createComponent(BookDetailsComponent);
        component = fixture.componentInstance;
        location = TestBed.inject(Location);
        elementDe = fixture.debugElement;
        router = TestBed.inject(Router);

        component.book = {
            id: 1,
            title: "title1",
            isStillAvailable: 1,
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
                color: "rgb(255, 255, 255)"
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
        };
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).withContext("should create component").toBeTruthy();

        expect(elementDe.query(By.css('.content'))).withContext("should create div with class content").toBeTruthy();
    })

    describe("leftPanel @Output", () => {

        it('should change value after click', () => {
            elementDe.query(By.css('#leftPanel')).query(By.css('#authors')).nativeElement.click();
            fixture.detectChanges();

            expect(component.detailsCategory).withContext('should change value to "authors"').toEqual('authors');

            elementDe.query(By.css('#leftPanel')).query(By.css('#details')).nativeElement.click();
            fixture.detectChanges();

            expect(component.detailsCategory).withContext('should change value to "details"').toEqual('details');

            elementDe.query(By.css('#leftPanel')).query(By.css('#publication')).nativeElement.click();
            fixture.detectChanges();

            expect(component.detailsCategory).withContext('should change value to "publication"').toEqual('publication');

            elementDe.query(By.css('#leftPanel')).query(By.css('#introWords')).nativeElement.click();
            fixture.detectChanges();

            expect(component.detailsCategory).withContext('should change value to "introWords"').toEqual('introWords');
        })

    })

    describe("router", () => {

        it('router should navigate', fakeAsync(() => {
            router.navigate(['id/1']);
            tick();

            expect(location.path()).withContext("should navigate").toBe('/id/1');
        }))

    })

    describe('#getBookById', () => {

        it('should get bookId and subscribe book by id', fakeAsync(() => {
            router.navigate(['id/1']);
            const bookId = Number(component.route.snapshot.params['id']);
            tick();

            bookServiceSpy.getBookById = jasmine.createSpy().and.returnValue(of());
            let subSpy = spyOn(bookServiceSpy.getBookById(bookId), 'subscribe');

            TestBed.createComponent(BookDetailsComponent);
            tick();

            expect(bookServiceSpy.getBookById).withContext("should have been called before subscribe method").toHaveBeenCalledBefore(subSpy);
            expect(subSpy).withContext("should have been called").toHaveBeenCalled();
        }))

    })

    describe('isStillAvailable', () => {

        describe('isStillAvailable == 1', () => {

            it('should create informations about still available book', () => {
                if (component.book) {
                    component.book.isStillAvailable = 1;
                }
                fixture.detectChanges();

                expect(elementDe.query(By.css('app-left-panel'))).withContext('should create app-left-panel').toBeTruthy();
                expect(elementDe.query(By.css('app-cover'))).withContext('should create app-cover').toBeTruthy();
                expect(elementDe.query(By.css('app-right-panel'))).withContext('should create app-right-panel').toBeTruthy();
                expect(elementDe.query(By.css('.panel'))).withContext('should create div with class panel').toBeTruthy();
                expect(elementDe.query(By.css('.title'))).withContext('should create div with class title').toBeTruthy();
            })

        })

        describe('isStillAvailable == 0', () => {

            it('should create informations about not available book', () => {
                if (component.book) {
                    component.book.isStillAvailable = 0;
                }
                fixture.detectChanges();

                expect(elementDe.query(By.css('app-cover'))).withContext('should create app-cover').toBeTruthy();
                expect(elementDe.query(By.css('.notAvailable'))).withContext('should create div with class notAvailable').toBeTruthy();
            })

        })

    })

})
