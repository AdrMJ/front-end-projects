import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverComponent } from './cover.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Book } from '../../../../modules/book/book';

describe('CoverComponent', () => {
    let fixture: ComponentFixture<CoverComponent>,
        component: CoverComponent,
        elementDe: DebugElement,
        book: Book;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CoverComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CoverComponent);
        component = fixture.componentInstance;
        elementDe = fixture.debugElement;
        fixture.detectChanges();

        book = {
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
    })

    it('should create', () => {
        expect(component).withContext("should create component").toBeTruthy();

        component.book = book;
        fixture.detectChanges();
        expect(elementDe.query(By.css('.book'))).withContext("should create .book").toBeTruthy();

        expect(elementDe.queryAll(By.css('img'))).withContext("should create all img").toBeTruthy();
        expect(elementDe.queryAll(By.css("img")).length).withContext("should create 3 img").toEqual(3);

        expect(elementDe.query(By.css("#booksidecolor"))).withContext("should create div with id book side color").toBeTruthy();
    })

    describe('@Input', () => {

        it('should @Input working', () => {
            component.book = book;
            fixture.detectChanges();

            expect(component.book).withContext("should change book's value").toEqual(book);
        })

        it('should image has correct src from @Input', () => {
            component.book = book;
            fixture.detectChanges();

            expect(elementDe.nativeElement.querySelector('#bookfront').src).withContext("should create image with src by book.imageUrl.frontUrl").toContain(book.imageUrl.frontUrl);
            expect(elementDe.nativeElement.querySelector('#bookside').src).withContext("should create image with src by book.imageUrl.sideUrl").toContain(book.imageUrl.sideUrl);
            expect(elementDe.nativeElement.querySelector('#bookback').src).withContext("should create image with src by book.imageUrl.backUrl").toContain(book.imageUrl.backUrl);
        })

    })

    describe('book.image.color', () => {

        it('should div with class booksidecolor has correct background-color', () => {
            component.book = book;
            fixture.detectChanges();

            expect(getComputedStyle(elementDe.nativeElement.querySelector('#booksidecolor')).backgroundColor.toString()).withContext("should contain book.imageUrl.color value").toContain(book.imageUrl.color);
        })

    })

})