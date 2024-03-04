import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelComponent } from './right-panel.component';
import { Book } from '../../../../modules/book/book';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RightPanelComponent', () => {
    let component: RightPanelComponent;
    let fixture: ComponentFixture<RightPanelComponent>;
    let elementDe: DebugElement;
    let book: Book;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RightPanelComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RightPanelComponent);
        component = fixture.componentInstance;
        elementDe = fixture.debugElement;

        component.book = {
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(elementDe.query(By.css('.panel'))).withContext('should create div with class panel').toBeTruthy();
        expect(elementDe.query(By.css('#content'))).withContext('should create div with id content').toBeTruthy();
    });

    // Switch tests
    it('should input working', () => {
        component.detailsCategory = 'detailsCategory test';
        fixture.detectChanges();

        expect(component.detailsCategory).withContext("should change detailsCategoty's value").toEqual('detailsCategory test');
    });

    //Intro Words
    it('should create div with class introWords and content', () => {
        component.detailsCategory = 'introWords';
        fixture.detectChanges();

        expect(elementDe.query(By.css('.introWords'))).withContext('should create div with class introWords').toBeTruthy();
        expect(elementDe.queryAll(By.css('.introWords')).length).withContext('should create 2 divs with class introWords').toEqual(2);
        expect(elementDe.queryAll(By.css('.content'))).withContext('should create div with class content').toBeTruthy();
        expect(elementDe.queryAll(By.css('.content')).length).withContext('should create 4 divs with class content').toEqual(4);
    });

    //Authors
    it('should create div with class authors and content', () => {
        component.detailsCategory = 'authors';
        fixture.detectChanges();

        expect(elementDe.query(By.css('.authors'))).withContext('should create div with class authors').toBeTruthy();
        expect(elementDe.queryAll(By.css('.content'))).withContext('should create div with class content').toBeTruthy();
        expect(elementDe.queryAll(By.css('.content')).length).withContext('should create 4 divs with class content').toEqual(4);
    });

    //Details
    it('should create div with class details and content', () => {
        component.detailsCategory = 'details';
        fixture.detectChanges();

        expect(elementDe.query(By.css('.details'))).withContext('should create div with class details').toBeTruthy();
        expect(elementDe.queryAll(By.css('.content'))).withContext('should create div with class content').toBeTruthy();
        expect(elementDe.queryAll(By.css('.content')).length).withContext('should create 3 divs with class content').toEqual(3);
    });
    
    //Publication
    it('should create div with class publication and content', () => {
        component.detailsCategory = 'publication';
        fixture.detectChanges();

        expect(elementDe.query(By.css('.publication'))).withContext('should create div with class publication').toBeTruthy();
        expect(elementDe.queryAll(By.css('.content'))).withContext('should create div with class content').toBeTruthy();
        expect(elementDe.queryAll(By.css('.content')).length).withContext('should create 3 divs with class content').toEqual(3);
        expect(elementDe.query(By.css('a'))).withContext('should create a').toBeTruthy();
    });

    //Default
    it('should create div with class default', () => {
        component.detailsCategory = '';
        fixture.detectChanges();

        expect(elementDe.query(By.css('div'))).withContext('should create div').toBeTruthy();
    });

});
